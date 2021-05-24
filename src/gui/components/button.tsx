import React from "react";
import styled from "styled-components";

const ButtonWrapper = styled.button<{ size?: number }>`
    border: none;
    outline: none;
    color: #fff;
    padding: 6px 1em;
    font-size: ${({ size }) => (size ? size + "px" : "18px")};
    font-weight: 600;
    border-radius: 3px;
    background-color: ${({ theme }) => (theme.backgroundButtonColor)};
    cursor: pointer;
    transition: all 200ms ease-in-out;

    &:hover {
        background-color: ${({ theme }) => (theme.linkHoverColor)};
    }

    &:focus {
        outline: none;
    }
`;

export function Button(props: any) {
    const { size } = props;

    return (
        <ButtonWrapper size={size} className={props.className} style={props.style}>
            {props.children}
        </ButtonWrapper>
    );
}
