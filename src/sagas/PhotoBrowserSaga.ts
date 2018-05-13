import {call, put, select, takeEvery} from 'redux-saga/effects';
import {ActionTypes} from '../actions/ActionTypes';
import {
    AddBrowserPhotos,
    BrowserDirectoryLoadStarted,
    IAddBrowserDirectoryAction,
} from '../actions/PhotoBrowserActions';
import * as fs from 'fs-extra';
import * as Promise from 'bluebird';
import * as mmmagic from 'mmmagic';
import {Magic} from 'mmmagic';
import * as path from 'path';
import * as sizeOf from 'image-size';
import * as sharp from 'sharp';
import {remote} from 'electron';
import * as crc from 'crc';
import {LocalDirectory} from '../reducers';
import * as uuidv4 from 'uuid/v4';

const sizeOfPromise = Promise.promisify(sizeOf);
const mimeMagic = new Magic(mmmagic.MAGIC_MIME_TYPE);
const detectFile = Promise.promisify(mimeMagic.detectFile, {context: mimeMagic});

function* prepareImage(fullPath: string) {
    const size = yield sizeOfPromise(fullPath);

    const appDataPath = remote.app.getPath('appData');
    const cacheDir = path.join(appDataPath, 'cache', 'thumbnails');
    yield call([fs, fs.ensureDir], cacheDir);

    const fileBuffer = yield call([fs, fs.readFile], fullPath);
    const imageCrc32 = crc.crc32(fileBuffer).toString(16);
    const thumbnailName = imageCrc32 + '.png';
    const thumbnailPath = path.join(cacheDir, thumbnailName);

    const exists = yield call([fs, fs.pathExists], thumbnailPath);
    if (!exists) {
        yield sharp(fullPath).resize(undefined, 200).toFile(thumbnailPath);
    }

    const image = {
        path: fullPath,
        thumbnailPath,
        width: size.width,
        height: size.height,
        id: uuidv4(),
    };
    yield put(AddBrowserPhotos([image]));
}

function* findImages(directory: string) {
    const state = yield select();
    const dir = state.photoBrowser.directories.find((dir: LocalDirectory) => dir.path === directory);
    if (dir && !dir.shouldLoad) {
        return;
    }

    yield put(BrowserDirectoryLoadStarted(directory));

    const files = yield call([fs, fs.readdir], directory);

    for (const file of files) {
        const fullPath = path.join(directory, file);
        const mimeType = yield call(detectFile, fullPath);
        switch (mimeType) {
            case 'image/jpeg':
            case 'image/png':
            case 'image/tiff':
            case 'image/gif':
                yield call(prepareImage, fullPath);
                break;
            case 'inode/directory':
                yield call(findImages, fullPath);
                break;
            default:
                break;
        }
    }
}

function* findImagesInDirectory(action: IAddBrowserDirectoryAction) {
    const {directory} = action;
    yield call(findImages, directory);
}

export function* photoBrowserSaga() {
    yield takeEvery(ActionTypes.ADD_BROWSER_DIRECTORY, findImagesInDirectory);
}