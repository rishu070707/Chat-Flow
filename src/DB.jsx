import React from 'react';
import styled from 'styled-components';
import img from './01-Trunks.png';
import img1 from './dbz-logo.png';
import img2 from './02-Trunks.png';
import img3 from './Zoro_Nothing_Happened_Wallpaper-removebg-preview.png';
import img4 from './op.jpg';
import img5 from './Zoro Nothing Happened Wallpaper HD.jpeg';
import img6 from './download.jpeg'; // recently uploaded
import img7 from './shanks.png'
import img8 from './shanks1.jpg'
const DbzCardWrapper = styled.div`
  width: 100%;
  max-width: 300px;
  height: 455px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 16px;
  perspective: 2500px;
  cursor: pointer;
  border-radius: 30px;
  margin: auto;

  .cover-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 30px;
  }

  .wrapper {
    transition: all 0.5s;
    position: absolute;
    width: 100%;
    z-index: 1;
    border-radius: 30px;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
                rgba(0, 0, 0, 0.22) 0px 10px 10px;

    &::before {
      content: "";
      opacity: 0;
      width: 100%;
      height: 100%;
      transition: all 0.5s;
      border-radius: 30px;
      position: absolute;
      left: 0;
      top: 0;
      background-image: linear-gradient(to top, transparent 46%, rgba(12, 13, 19, 0.5) 68%, rgba(12, 13, 19) 97%);
    }
  }

  &:hover .wrapper {
    transform: perspective(900px) translateY(-5%) rotateX(25deg);
    box-shadow: 2px 35px 32px -8px rgba(0, 0, 0, 0.75);
  }

  &:hover .wrapper::before {
    opacity: 1;
  }

  .logo {
    width: 80%;
    transition: transform 0.5s;
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 2;
  }

  &:hover .logo {
    transform: translate3d(-50%, -50px, 100px);
  }

  &:hover .cover-image {
    opacity: 0.3;
  }

  .character {
    width: 100%;
    opacity: 0;
    transition: all 0.5s;
    filter: drop-shadow(2px 2px 2px #000);
    position: absolute;
    z-index: 2;
  }

  &:hover .character {
    opacity: 1;
    transform: translate3d(0%, -30%, 100px);
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  padding: 2rem;
`;

const DbzCard = ({ cover, logo, character }) => (
  <DbzCardWrapper>
    <div className="wrapper">
      <img src={cover} className="cover-image" alt="cover" />
    </div>
    <img src={logo} className="logo" alt="logo" />
    <img src={character} className="character" alt="character" />
  </DbzCardWrapper>
);

const DB = () => {
  return (
    <Grid className="mb-5">
      <DbzCard cover={img} logo={img1} character={img2} />
      <DbzCard cover={img5} logo={img4} character={img3} />
      <DbzCard cover={img8} logo={img4} character={img7} />
    </Grid>
  );
};

export default DB;
