import styled from 'styled-components';
import VisualBg from '../../assets/img/header.webp'

export default function LayoutHeader (){
    return (
        <Header>
            <div className="visual" />
            <nav>
                <ul>
                    <li>
                        <a href="">리그 순위</a>
                    </li>
                    <li>
                        <a href="">리그 리더</a>
                    </li>
                    <li>
                        <a href="">FA 선수</a>
                    </li>
                    <li>
                        <a href="">선수 검색</a>
                    </li>
                </ul>
            </nav>
        </Header>
    )
}

const Header = styled.header`
    position:relative;
    width:100%;

    .visual {position:relative; width:100%; height:350px; background:url(${VisualBg}) 50% 50% no-repeat; background-size:cover;}

      nav {
        position:relative; width:100%;
      }
    
      nav ul {
        position:relative; width:100%; height:75px; display:flex; align-items:center; justify-content: center; gap:0 36px;border-bottom:1px solid #eee;
      }
    
      nav ul li a {
        font-weight:700; font-size:var(--nav-tit); color:var(--color-black); text-decoration: none;
      }
    
      nav ul li a:hover {
        color:#C8102E;
      }

    @media only screen and (max-width: 1024px) {
      nav ul {
        gap:0 24px;
      }
    }
`