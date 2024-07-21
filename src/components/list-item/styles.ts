import styled from 'styled-components/native'
import { Font } from '../../theme/global'

export const Container = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 12px;
    gap: 4px;
    background: ${props => props.theme.boxBg};
    border-radius: 12px;
    margin-bottom: 8px;
`
export const Title = styled(Font)`
    font-size: 18px;
    font-weight: 700;
`
export const Description = styled(Font)`
    font-size: 14px;
`
export const Column = styled.View`
    flex-direction: column;
`