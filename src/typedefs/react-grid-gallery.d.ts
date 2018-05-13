declare module 'react-grid-gallery' {
    export type GalleryImage = {
        src: string,
        thumbnail: string,
        thumbnailWidth: number,
        thumbnailHeight: number,
        alt?: string,
        tags?: { [index: string]: string },
        isSelected?: boolean,
        caption?: string,
        srcSet?: any[],
        customOverlay?: Element,
        thumbnailCaption?: string | Element,
        orientation?: number,
    };

    export interface IGalleryProps {
        images: GalleryImage[];
        onSelectImage?: (index: number, image: GalleryImage) => void;
    }

    export default class Gallery extends React.Component<IGalleryProps, {}> {}
}