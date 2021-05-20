import React from "react";
import styled from "styled-components";

const BrandContainer = styled.div<{ color: string, hoverColor: string, size?: number, withShadow: boolean }>`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 0;
    font-family: "CourierNew-Bold";
    font-size: ${({ size }) => (size ? size + "em" : "1.25em")};
    color: ${({ color }) => (color ? color : "#000")};
    text-shadow: ${({ theme, withShadow }) => (withShadow ? theme.textShadow : "none")};

    &:hover {
        color: ${({ color, hoverColor }) => (hoverColor ? hoverColor : (color ? color : "#000"))};
        
        div {
            color: ${({ color, hoverColor }) => (hoverColor ? hoverColor : (color ? color : "red"))};
        }
    }
`;

const BrandNot = styled.div<{ color: string, hoverColor: string, withShadow: boolean }>`
    display: inline;
    margin-left: ${({ withShadow }) => (withShadow ? "5px" : "0")};
    margin-right: ${({ withShadow }) => (withShadow ? "5px" : "0")};
    color: ${({ color }) => (color ? color : "red")};
`;

export function Brand(props: any) {
    const { color, hoverColor, size, withShadow } = props;

    return (
        <BrandContainer color={color} hoverColor={hoverColor} size={size} withShadow={withShadow}>
            SHOES<BrandNot color={color} hoverColor={hoverColor} withShadow={withShadow}>NOT</BrandNot>INCLUDED
        </BrandContainer>
    );
}
