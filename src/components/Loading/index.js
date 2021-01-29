import styled from 'styled-components';
import db from '../../../db.json';
import RingLoader from 'react-spinners/RingLoader';

const Loading = styled.div`
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export default function LoadingBase() {
    return(
        <Loading>
            <RingLoader color={db.theme.colors.secondary} />
        </Loading>
    );
};
