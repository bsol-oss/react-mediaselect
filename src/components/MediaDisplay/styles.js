import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { Box } from '@chakra-ui/react'

const overlay = css`
    .overlay {
        align-content: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 100%;
        left: 0;
        opacity: 0;
        position: absolute;
        transform: scale(1.4);
        top: 0;
        width: 100%;
        z-index: 1;

        transition: transform 0.4s ease, opacity 0.4s ease;

        & > div {
            padding: 0.2rem 0;
            text-align: center;
        }

        button {
            color: #000;
            background: #fff;
            border-radius: 0.2rem;
            padding: 0.1rem 0.4rem;
        }
    }

    &:hover .overlay {
        opacity: 1;
        transform: scale(1);
    }
`

export const ImageItemContainer = styled(Box)`
    background: #fff;
    position: relative;
    width: 100%;
    height: 100%;

    ${overlay}
`

export const ImageItem = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    background-size: cover;
`

export const VideoThumbnailContainer = styled.a`
    cursor: pointer;
    position: relative;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    ${overlay}
`

export const VideoThumbnail = styled.video`
    object-fit: cover;
    object-position: center;
    pointer-event: none;
    width: 100%;
    height: 100%;
    background-size: cover;
`

export const ApplicationIcons = styled.div`
    position: relative;
    font-weight: bold;
    background: white;
    cursor: ${({ preview }) => (preview ? 'initial' : 'pointer')};
    display: flex;
    width: 100%;
    height: 100%;

    svg {
        margin: auto;
        width: 50%;
        height: 50%;
        color: ${({ color }) => color};
    }
`
