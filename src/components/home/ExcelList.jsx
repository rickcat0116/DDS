import styled from 'styled-components';
import { TACTICS } from "../data/homeData";
export default function ExcelList(){
    return (
        <SimulationData>
            <div className="inner">
                <div className="sec_tit">
                    <h1>시뮬 데이터</h1>
                </div>

                <ul className="simul_list">
                    {TACTICS.map((item) =>
                        <li>
                            <strong>{item.title}</strong>
                            <ul>
                                {item.menu.map((item) =>
                                    <li><a href={item.link}>{item.title}</a></li>
                                )}
                            </ul>
                        </li>
                    )}
                </ul>
            </div>
        </SimulationData>
    )
}

const SimulationData = styled.section`
  position:relative;
  padding:35px 0 70px;
  
  .simul_list {
    display:flex;
    justify-content: center;
    gap:0 60px;
    
    > li {
      flex:1;
      text-align:center;
    
      strong {
        font-weight:600;
        font-size:var(--nav-tit)l
      }
      
      > ul li {
        margin-top:18px;
        
        a {
          display:block;
          width:100%;
          height:40px;
          line-height:40px;
          text-align:center;
          font-weight:600;
          font-size:var(--nav-tit);
          color:#1d428a;
          border-radius:18px;
          background:transparent;
          border:1px solid #1d428a;
          text-decoration: none;
          transition:all .3s;
        
          &:hover {
            background:#1d428a;
            color:#ffffff;
          }
        }
      }
    }
  }
`