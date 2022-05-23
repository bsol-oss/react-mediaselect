import React from 'react'
import styled from '@emotion/styled'
import { Box } from '@chakra-ui/react'

const OverlayContainer = styled.div`
    .border {
        border: 3px solid #00fff6;
        height: 100%;
        left: 0;
        opacity: 0;
        padding: 1px;
        position: absolute;
        top: 0;
        width: 100%;

        .selected & {
            opacity: 1;
        }
    }

    .opacity {
        background: #00fff6;
        height: 100%;
        left: 0;
        opacity: 0;
        padding: 1px;
        position: absolute;
        top: 0;
        width: 100%;

        .selected & {
            opacity: 0.1;
        }
    }
`

export const Overlay = () => (
    <OverlayContainer>
        <div className="border" />
        <div className="opacity" />
    </OverlayContainer>
)

export const ImageItemContainer = styled(Box)`
    background: #fff;
    cursor: pointer;
    height: 100%;
    position: relative;
    width: 100%;
    transition: padding 0.15s;

    &.selected {
        padding: 4px;
    }

    img {
        background-size: cover;
        object-fit: cover;
        object-position: center;
        height: 100%;
        width: 100%;
    }
`

export const VideoThumbnailContainer = styled(Box)`
    align-items: center;
    cursor: pointer;
    display: flex;
    height: 100%;
    justify-content: center;
    position: relative;
    transition: padding 0.15s;

    &.selected {
        padding: 4px;
    }
`

export const VideoThumbnail = styled.video`
    background-size: cover;
    height: 100%;
    object-fit: cover;
    object-position: center;
    pointer-event: none;
    width: 100%;
`

export const ApplicationIcons = styled.div`
    position: relative;
    font-weight: bold;
    background: white;
    cursor: ${({ preview }) => (preview ? 'initial' : 'pointer')};
    margin: ${({ theme: { fileUploadDropZone } }) =>
        fileUploadDropZone.fontSize}rem;
    display: flex;
    transition: padding 0.15s;

    &.selected {
        padding: 4px;
    }

    svg {
        margin: 1rem 2rem 3rem 1rem;
        height: 8rem;
        width: 8rem;
        color: ${({ color }) => color};
    }
`

export const ThumbnailsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    padding: 0.5rem 0;

    > div {
        max-width: 25%;
        padding: 0 5px;
    }
`
