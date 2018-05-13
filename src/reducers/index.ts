import {Action, combineReducers} from 'redux';
import {ActionTypes} from '../actions/ActionTypes';
import {
    IAddBrowserDirectoryAction,
    IBrowserDirectoryLoadStartedAction, IToggleSelectBrowserPhotoAction,
    ISetBrowserVisibilityFilterAction, IChangePostItemOrderAction, IAddBrowserPhotos,
} from '../actions/PhotoBrowserActions';
import {arrayMove} from 'react-sortable-hoc';
import * as uuidv4 from 'uuid/v4';

export type LocalImage = {
    id: string;
    path: string;
    thumbnailPath: string;
    width: number;
    height: number;
    caption?: string;
};

export type MarkdownItem = {
    id: string;
    markdown: string;
};

export type PostItem = MarkdownItem | LocalImage;

export function isMarkdownItem(item: PostItem): item is MarkdownItem {
    return (<MarkdownItem>item).markdown !== undefined;
}

export function isLocalImage(item: PostItem): item is LocalImage {
    return (<LocalImage>item).path !== undefined;
}

export type LocalDirectory = {
    path: string;
    shouldLoad: boolean;
};

export enum VisibilityFilter {
    All,
    Selected,
}

export type PhotoBrowserState = {
    directories: LocalDirectory[],
    localImages: LocalImage[],
    selectedImages: Set<string>;
    visibilityFilter: VisibilityFilter;
    postItems: PostItem[],
};

const initialPhotoBrowserState = {
    directories: [],
    localImages: [],
    selectedImages: new Set(),
    visibilityFilter: VisibilityFilter.All,
    postItems: [{markdown: 'This is my post editor!', id: uuidv4()}],
};

function photoBrowser(state: PhotoBrowserState = initialPhotoBrowserState, action: Action): PhotoBrowserState {
    switch (action.type) {
        case ActionTypes.ADD_BROWSER_PHOTOS: {
            const {localImages} = action as IAddBrowserPhotos;
            const oldImages = state.localImages;
            return {
                ...state,
                localImages: [...oldImages, ...localImages],
            };
        }
        case ActionTypes.ADD_BROWSER_DIRECTORY: {
            const {directory} = action as IAddBrowserDirectoryAction;
            const dirs = state.directories;
            if (dirs.find((dir) => dir.path === directory)) {
                return state;
            }
            return {
                ...state,
                directories: [
                    ...state.directories,
                    {
                        path: directory,
                        shouldLoad: true,
                    }
                ]
            };
        }
        case ActionTypes.BROWSER_DIRECTORY_LOAD_STARTED: {
            const {directory} = action as IBrowserDirectoryLoadStartedAction;
            const dirs = state.directories;
            const existingDirIndex = dirs.findIndex((dir) => dir.path === directory);
            if (existingDirIndex === -1) {
                return state;
            }
            console.log(existingDirIndex);
            return {
                ...state,
                directories: [
                    ...dirs.slice(0, existingDirIndex),
                    {
                        ...dirs[existingDirIndex],
                        shouldLoad: false,
                    },
                    ...dirs.slice(existingDirIndex + 1, dirs.length)
                ]
            };
        }
        case ActionTypes.TOGGLE_SELECT_BROWSER_PHOTO: {
            const {imagePath} = action as IToggleSelectBrowserPhotoAction;
            const newSet = new Set(state.selectedImages);
            if (newSet.has(imagePath)) {
                newSet.delete(imagePath);
            } else {
                newSet.add(imagePath);
            }

            const {postItems, localImages} = state;
            let newPostItems = postItems;
            const localImage = localImages.find((image): boolean => image.path === imagePath);
            if (localImage) {
                const index = postItems.indexOf(localImage);
                if (index >= 0) {
                    newPostItems = [
                        ...newPostItems.slice(0, index),
                        ...newPostItems.slice(index + 1, newPostItems.length),
                    ];
                } else {
                    newPostItems = [
                        ...newPostItems,
                        localImage,
                    ];
                }
            }

            return {
                ...state,
                selectedImages: newSet,
                postItems: newPostItems,
            };
        }
        case ActionTypes.SET_BROWSER_VISIBILITY_FILTER: {
            const {visibilityFilter} = action as ISetBrowserVisibilityFilterAction;
            return {
                ...state,
                visibilityFilter,
            };
        }
        case ActionTypes.CHANGE_POST_ITEM_ORDER: {
            const {fromIndex, toIndex} = action as IChangePostItemOrderAction;
            const {postItems} = state;
            if (fromIndex < 0 || fromIndex >= postItems.length || toIndex < 0 || toIndex > postItems.length) {
                return state;
            }
            const newItems = arrayMove(postItems, fromIndex, toIndex);
            return {
                ...state,
                postItems: newItems,
            };
        }
        default: {
            return state;
        }
    }
}

type GlobalState = {
    photoBrowser: PhotoBrowserState,
};

const photocatApp = combineReducers({
    photoBrowser,
});

export { photocatApp, GlobalState };
