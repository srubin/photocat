import {GlobalState, PostItem} from '../reducers';
import {connect} from 'react-redux';
import PostEditor from '../components/PostEditor';
import {ChangePostItemOrderAction} from '../actions/PhotoBrowserActions';

interface IStateProps {
    items: PostItem[];
}

interface IDispatchProps {
    reorderPostItems: (fromIndex: number, toIndex: number) => void;
}

const mapStateToProps = (state: GlobalState): IStateProps => {
    return {
        items: state.photoBrowser.postItems,
    };
};

const mapDispatchToProps: IDispatchProps = {
    reorderPostItems: ChangePostItemOrderAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostEditor);
