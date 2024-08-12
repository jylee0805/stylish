import styled from "styled-components";
import member from "./img/member.png";
import memberHover from "./img/member-hover.png";
import memberMobile from "./img/member-mobile.png";
import { useContext } from "react";
import { AppContext } from "../../App-context";

const MemberLink = styled.a`
  @media (max-width: 1279.9px) {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;
    position: relative;
    color: #fff;
  }
`;

const FeatureName = styled.p`
  display: none;

  @media (max-width: 1279.9px) {
    display: block;
  }
`;
const Member = styled.img`
  width: 44px;
  height: 44px;
  border-radius: 50%;

  ${MemberLink}:hover & {
    content: url(${(props) => (props.profileImg == member ? memberHover : "")});
  }
  @media (max-width: 1279.9px) {
    content: url(${(props) => (props.profileImg == member ? memberMobile : "")});
  }
`;

const HeaderMember = () => {
  const { profileImg } = useContext(AppContext);

  return (
    <MemberLink href="/member" className="link">
      {<Member src={profileImg} alt="member-icon" profileImg={profileImg} />}
      <FeatureName>會員</FeatureName>
    </MemberLink>
  );
};
export default HeaderMember;
