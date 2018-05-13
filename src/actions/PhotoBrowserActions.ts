import {Action} from 'redux';
import {ActionTypes} from './ActionTypes';
import {LocalImage, VisibilityFilter} from '../reducers';

export interface IAddBrowserDirectoryAction extends Action {
    directory: string;
}
export const AddBrowserDirectoryAction = (directory: string): IAddBrowserDirectoryAction => {
    return {
        type: ActionTypes.ADD_BROWSER_DIRECTORY,
        directory,
    };
};

export interface IBrowserDirectoryLoadStartedAction extends Action {
    directory: string;
}
export const BrowserDirectoryLoadStarted = (directory: string): IBrowserDirectoryLoadStartedAction => {
    return {
        type: ActionTypes.BROWSER_DIRECTORY_LOAD_STARTED,
        directory,
    };
};

export interface IAddBrowserPhotos extends Action {
    localImages: LocalImage[];
}
export const AddBrowserPhotos = (localImages: LocalImage[]): IAddBrowserPhotos => {
    return {
        type: ActionTypes.ADD_BROWSER_PHOTOS,
        localImages,
    };
};

export interface IToggleSelectBrowserPhotoAction extends Action {
    imagePath: string;
}
export const ToggleSelectBrowserPhotoAction = (imagePath: string): IToggleSelectBrowserPhotoAction => {
    return {
        type: ActionTypes.TOGGLE_SELECT_BROWSER_PHOTO,
        imagePath,
    };
};

export interface ISetBrowserVisibilityFilterAction extends Action {
    visibilityFilter: VisibilityFilter;
}
export const SetBrowserVisibilityFilterAction = (
    visibilityFilter: VisibilityFilter
): ISetBrowserVisibilityFilterAction => {
    return {
        type: ActionTypes.SET_BROWSER_VISIBILITY_FILTER,
        visibilityFilter,
    };
}

export interface IChangePostItemOrderAction extends Action {
    fromIndex: number;
    toIndex: number;
}
export const ChangePostItemOrderAction = (fromIndex: number, toIndex: number): IChangePostItemOrderAction => {
    return {
        type: ActionTypes.CHANGE_POST_ITEM_ORDER,
        fromIndex,
        toIndex,
    };
};
