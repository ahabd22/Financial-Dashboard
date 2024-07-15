import styled from "styled-components";

export const MainLayout = styled.div`
    display: flex;
    height: 100vh;
`;

export const InnerLayout = styled.div`
    padding: 2rem 1.5rem;
    width: 100%; 
`;


export const MainContent = styled.main`
    flex-grow: 1;
    margin-left: 250px;
    overflow-y: auto;
    padding: 20px; 
`;