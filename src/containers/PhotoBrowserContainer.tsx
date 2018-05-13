import {GlobalState, LocalImage, VisibilityFilter} from '../reducers';
import {connect} from 'react-redux';
import PhotoBrowser from '../components/PhotoBrowser';
import {ToggleSelectBrowserPhotoAction} from '../actions/PhotoBrowserActions';

export interface IReduxStateProps {
    localImages: LocalImage[];
    selectedImages: Set<string>;
    visibilityFilter: VisibilityFilter;
}

const mapStateToProps = (state: GlobalState): IReduxStateProps => {
    return {
        localImages: state.photoBrowser.localImages,
        selectedImages: state.photoBrowser.selectedImages,
        visibilityFilter: state.photoBrowser.visibilityFilter,
    };
};

export interface IReduxDispatchProps {
    toggleSelectPhoto: (imagePath: string) => void;
}

const mapDispatchToProps: IReduxDispatchProps = {
    toggleSelectPhoto: ToggleSelectBrowserPhotoAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(PhotoBrowser);
