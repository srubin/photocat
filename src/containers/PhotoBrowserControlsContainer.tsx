import {connect} from 'react-redux';
import {AddBrowserDirectoryAction, SetBrowserVisibilityFilterAction} from '../actions/PhotoBrowserActions';
import PhotoBrowserControls from '../components/PhotoBrowserControls';
import {GlobalState, VisibilityFilter} from '../reducers';

interface IStateProps {
    visibilityFilter: VisibilityFilter;
}

interface IDispatchProps {
    addDirectory: (directory: string) => void;
    setVisibilityFilter: (filter: VisibilityFilter) => void;
}

const mapStateToProps = (state: GlobalState): IStateProps => {
    return {
        visibilityFilter: state.photoBrowser.visibilityFilter,
    };
};

const mapDispatchToProps: IDispatchProps = {
    addDirectory: AddBrowserDirectoryAction,
    setVisibilityFilter: SetBrowserVisibilityFilterAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(PhotoBrowserControls);
