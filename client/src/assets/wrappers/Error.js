import styled from 'styled-components';
const Wrapper = styled.main`
    .page_404 {
        padding: 40px 0;
        background: #fff;
        display: flex;
        align-items: center;
    }

    .page_404 img {
        width: 100%;
    }

    .four_zero_four_bg {
        background-image: url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif);
        height: 500px;
        background-position: center;
    }

    .four_zero_four_bg h1 {
        font-size: 80px;
    }

    .four_zero_four_bg h3 {
        font-size: 80px;
    }

    .link_404 {
        color: #fff !important;
        padding: 10px 20px;
        background: var(--primary-400);
        margin: 20px 0;
        display: inline-block;
        text-transform: capitalize;
    }
    .contant_box_404 {
        margin-top: -50px;
    }
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export default Wrapper;
