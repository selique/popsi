import styled from 'styled-components'

const Avatar = styled.div`
	width: ${({ width }) => width || '80px'};
	height: ${({ height }) => height || '80px'};
	${({ background }) =>
		`
			background: url(${background});
			background-repeat: no-repeat;
			background-attachment: fixed;
			background-position: center;
			background-size: 100%;
		`}
	border-radius: 100%;
	border: 3px solid #ffffff;
	background-color: #ac8fbf;
	color: '#ffffff';
	display: flex;
	justify-content: center;
	align-items: center;
	box-shadow: 0 4px 8px #00000022;
`

export default Avatar
