import styled from "styled-components";
import Image from "next/image";

const LoadingGif = () => {
  return <Image priority src="/loading.gif" alt="" width={300} height={300} />;
};

export function Loading() {
  return (
    <LoadingContainer>
      <LoadingGif />
      <LoadingText>loading</LoadingText>
    </LoadingContainer>
  );
}

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LoadingText = styled.p`
  font-size: 2rem;
  color: var(--darkblue);
`;
