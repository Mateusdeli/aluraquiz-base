import styled from 'styled-components';
import db from '../../../db.json';
import BounceLoader from 'react-spinners/BounceLoader';

const Loading = styled.div`
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export default function LoadingBase() {
    return(
        <Loading>
            <BounceLoader color={db.theme.colors.primary} />
        </Loading>
    );
};
