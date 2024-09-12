import styled from 'styled-components';
import { EAST_DIVISIONS, WEST_DIVISIONS } from "../data/homeData";

export default function TeamList(){
    return (
        <AllTeamList>
            <div className="inner">
                <div className="sec_tit">
                    <h1>TEAM LIST</h1>
                </div>

                <div className="team_list">
                    <div className="east">
                        <h4>EASTERN CONFERENCE</h4>

                        <div className="division_list">
                            {EAST_DIVISIONS.map((item) =>
                                <ul key={item.division}>
                                    {item.teams.map((item) =>
                                        <li key={item.title}>
                                            <a href={item.link}>
                                                <img src={item.image} alt={item.title} />
                                            </a>
                                        </li>
                                    )}
                                </ul>
                            )}
                        </div>
                    </div>
                    <div className="west">
                        <h4>WESTERN CONFERENCE</h4>
                        <div className="division_list">
                            {WEST_DIVISIONS.map((item) =>
                                <ul key={item.division}>
                                    {item.teams.map((item) =>
                                        <li key={item.title}>
                                            <a href={item.link}>
                                                <img src={item.image} alt={item.title} />
                                            </a>
                                        </li>
                                    )}
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AllTeamList>
    )
}

const AllTeamList = styled.section`
  position:relative;
  padding:70px 0 35px;

  .team_list {
    margin-top:60px;
    display:flex;
    justify-content: center;
    gap:0 36px;
    
    h4 {
      font-weight:700;
      font-size:var(--team-tit);
      text-align:center;
    }
    
    .east h4 {
      color:#1D428A;
    }
    
    .west h4 {
      color:#C8102E;
    }
    
    .division_list {
      margin-top:30px;
      display:flex;
      
      ul {
        display:flex;
        flex-direction: column;
        gap:20px 0;
        flex:1;
        
        li a {
          img {
            width:100%;
          }
          
          &:hover img {
            transform:scale(1.1);
          }
        }
      }
      
      ul + ul {
        margin-left:20px;
      }
    }
  }
`