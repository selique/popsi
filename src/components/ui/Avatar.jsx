import styled from 'styled-components'

const AvatarStyled = styled.div`
	width: ${({ width }) => width || '115px'};
	height: ${({ height }) => height || '115px'};
	background: ${({ background }) => `url(${background})`};
	background-color: #ac8fbf;
	background-origin: content-box;
	background-position: center;
	background-size: cover;
	position: relative;
	${({ hasBorder = true }) =>
		hasBorder &&
		`
			border: 20px solid #f4f4f4;
		`}
	border-radius: 50%;
	display: inline-flex;
	vertical-align: top;
	justify-content: center;
	align-items: center;
	overflow: hidden;
	/* box-shadow: 0 4px 8px #00000022; */
`

const Avatar = ({ ...props }) => <AvatarStyled {...props} />

export default Avatar
