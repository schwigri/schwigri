import { ButtonVariant } from "../.types/component.types";
import React from "react";
import styled from "styled-components";

const Icon = styled("span")`
	align-items: center;
	display: flex;
	height: 100%;
	svg {
		fill: ${({ theme }): string => theme.colors.copy};
		height: 100%;
		width: auto;
	}
`;

interface WrapperProps {
	$variant: ButtonVariant;
}

const Wrapper = styled("button")<WrapperProps>`
	appearance: none;
	background-color: transparent;
	border: 0;
	color: inherit;
	cursor: pointer;
	font: inherit;
	margin: 0;
	padding: 0;
	text-transform: lowercase;
`;

interface ButtonProps {
	className?: string;
	icon?: React.ReactNode;
	onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

interface NoLabelProps extends ButtonProps {
	"aria-label": string;
	variant: "no-label";
	value?: string;
}

interface PlainProps extends ButtonProps {
	"aria-label"?: string;
	variant: "plain";
	value: string;
}

type Props = NoLabelProps | PlainProps;

class Button extends React.Component<Props> {
	render(): React.ReactNode {
		const { className, icon, onClick, value, variant = "plain" } = this.props;

		return (
			<Wrapper
				aria-label={this.props["aria-label"]}
				className={className}
				onClick={onClick}
				$variant={variant}
			>
				{value && (
					<span aria-hidden={variant === "no-label" ? "true" : undefined}>
						{value}
					</span>
				)}
				{icon && <Icon>{icon}</Icon>}
			</Wrapper>
		);
	}
}

export { Button };
