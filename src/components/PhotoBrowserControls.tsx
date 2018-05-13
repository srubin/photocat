import * as React from 'react';
import {remote} from 'electron';
import {VisibilityFilter} from '../reducers';
import * as classNames from 'classnames';

interface IProps {
    addDirectory: (directory: string) => void;
    visibilityFilter: VisibilityFilter;
    setVisibilityFilter: (filter: VisibilityFilter) => void;
}

export default class PhotoBrowserControls extends React.Component<IProps> {
    handleAddClick = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        const dirs = remote.dialog.showOpenDialog({properties: ['openDirectory', 'multiSelections']});
        for (const dir of dirs) {
            this.props.addDirectory(dir);
        }
    }

    handleFilterClick = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        const {visibilityFilter, setVisibilityFilter} = this.props;
        const newFilter = visibilityFilter === VisibilityFilter.All ? VisibilityFilter.Selected : VisibilityFilter.All;
        setVisibilityFilter(newFilter);
    }

    render() {
        const filterClass = this.props.visibilityFilter === VisibilityFilter.Selected ? 'On' : undefined;
        return (
            <div className='PhotoBrowserControls'>
                <button onClick={this.handleAddClick}>Add Directory</button>
                <button className={classNames(filterClass)} onClick={this.handleFilterClick}>Toggle Selected</button>
            </div>
        );
    }
}
