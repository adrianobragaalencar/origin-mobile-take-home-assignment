import styled from '@emotion/native';
import { TextProps } from 'react-native';

export const Amount = styled.Text<{ type: string } & TextProps>`
  font-size: 13px;
  font-weight: bold;
  color: ${({type}) => {
    switch (type) {
      case 'withdrawal':
      case 'payment':
        return 'crimson';
      case 'deposit':
        return 'darkgreen';
      case 'invoice':
        return 'dimgray';
      default:
        return 'black';
    }
  }};
`;

export const DateText = styled.Text`
  color: #757575;
  font-size: 13px;
`;

export const Image = styled.Image`
  width: 60px;
  height: 60px;
  borderWidth: 1px;
  borderRadius: 75px;
  marginEnd: 10px;
`

export const anonymousAvatar = 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/240px-Default_pfp.svg.png';
export const placeholder = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png';