
import styled from 'styled-components';

import DraftUtil from "../draft/draftUtil";
import DraftReady from "../draft/draftReady";
import DraftBoard from "../draft/draftBoard";
import DraftSummary from "../draft/draftSummary";

// 부모 컴포넌트: DraftRoom
export default function DraftRoom () {

    return (
        <DraftRoomWrap>
            <div className="draft_top">
                <DraftUtil />
                <DraftReady />
            </div>
            <div className="draft_mid">
                <DraftBoard />
                <DraftSummary />
            </div>
        </DraftRoomWrap>
    )
}

const DraftRoomWrap = styled.div`
    padding: 20px;
  
    .draft_top {
      display:flex;
      gap:0 30px;
    }
`;