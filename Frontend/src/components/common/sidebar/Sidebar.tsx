import { useRef } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import { BiMenu, BiMenuAltRight, BiLogOut } from "react-icons/bi";
import { TbDeviceDesktopSearch } from "react-icons/tb";
import { FaChartBar, FaChartLine } from "react-icons/fa";
import { PiBooksDuotone } from "react-icons/pi";
import { RiArchiveDrawerFill } from "react-icons/ri";
import { MdDashboardCustomize } from "react-icons/md";
import Colors from "../../../constants/Color";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

function Sidebar({ sidebarOpen, setSidebarOpen }: SidebarProps) {
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName")

  const sidebarRef = useRef(null);
  const profileWrapperRef = useRef(null);
  const logoRef = useRef(null);
  const profileContentRef = useRef(null);
  const sideLinkLabelRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const logoutBtnRef = useRef(null);
  const toggleButtonRef = useRef(null);

  const location = useLocation();

  useGSAP(() => {
    const tl = gsap.timeline();
    const list = [
      profileContentRef.current,
      logoRef.current,
      ...sideLinkLabelRefs.current,
    ];
    if (sidebarOpen) {
      tl.to([sidebarRef.current, profileWrapperRef.current], {
        width: "250px",
        minWidth: "250px",
      })
        .set(
          [toggleButtonRef.current, logoutBtnRef.current],
          { textAlign: "right" },
          "<"
        )
        .set(list, { display: "" })
        .to(list, { opacity: 1 });
    } else {
      tl.to([sidebarRef.current, profileWrapperRef.current], {
        width: "78px",
        minWidth: "78px",
      })
        .to(list, { opacity: 0, duration: 0.3 }, "<")
        .set(
          [toggleButtonRef.current, logoutBtnRef.current],
          {
            textAlign: "center",
          },
          "<"
        )
        .set(list, { display: "none" });
    }
  }, [sidebarOpen]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const changePage = (to: string) => {
    navigate(to);
  };
  const logout = () => {
    window.localStorage.removeItem("accessToken"); 
    navigate("/");
  };

  return (
    <SidebarWrapper ref={sidebarRef}>
      <LogoDetails>
        <Logo ref={logoRef}>
          <img src="/Image/Logo/logo.png" />
          <div>Trend24</div>
        </Logo>
        <ToggleButton ref={toggleButtonRef} onClick={toggleSidebar}>
          {sidebarOpen ? <BiMenuAltRight /> : <BiMenu />}
        </ToggleButton>
      </LogoDetails>
      <NavList>
        {linksArray.map(({ icon, label, to }, index) => (
          <NavItem key={label} onClick={() => changePage(to)}>
            <LinkWrapper $isActive={location.pathname === to}>
              <i>{icon}</i>
              <span ref={(ref) => (sideLinkLabelRefs.current[index] = ref)}>
                {label}
              </span>
            </LinkWrapper>
            {!sidebarOpen && <Tooltip>{label}</Tooltip>}
          </NavItem>
        ))}
      </NavList>
      <ProfileWrapper ref={profileWrapperRef}>
        <ProfileDetails ref={profileContentRef}>
          <ProfileImage src="/Image/Logo/logo4.png" alt="profileImg" />
          <NameJob>
            <div className="name">{userName}</div>
            <div className="job">YES24 중고서점 목동점</div>
          </NameJob>
        </ProfileDetails>
        <LogOutButton ref={logoutBtnRef}>
          <BiLogOut onClick={logout} />
        </LogOutButton>
      </ProfileWrapper>
    </SidebarWrapper>
  );
}

export default Sidebar;

const linksArray = [
  {
    label: "인기 트렌드",
    icon: <FaChartLine />,
    to: "/main",
  },
  {
    label: "트렌드 조회",
    icon: <TbDeviceDesktopSearch />,
    to: "/main/trendSearch",
  },
  {
    label: "유저 통계",
    icon: <FaChartBar />,
    to: "/main/userActivity",
  },
  {
    label: "도서 검색",
    icon: <PiBooksDuotone />,
    to: "/main/bookSearch",
  },
  {
    label: "서랍",
    icon: <RiArchiveDrawerFill />,
    to: "/main/bookDrawer",
  },
  {
    label: "커스텀페이지",
    icon: <MdDashboardCustomize />,
    to: "/main/customizePage",
  },
];

const SidebarWrapper = styled.div`
  margin: 10px;
  border-radius: 20px;
  background: ${Colors.containerBackground};
  padding: 6px 14px;
  width: 250px;
  z-index: 99;
  box-sizing: border-box;
`;

const Logo = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 10px;
  img {
    width: 60px;
    margin-right: 15px;
  }
  div {
    font-size: 20px;
    font-weight: 600;
  }

  &:hover {
    cursor: pointer;
  }
`;

const LogoDetails = styled.div`
  position: relative;
  height: 60px;
  display: flex;
  align-items: center;
  text-align: center;
  margin-bottom: 50px;
`;

const ToggleButton = styled.i`
  position: absolute;
  top: 30%;
  right: 0;
  min-width: 50px;
  font-size: 23px;
  text-align: right;
  cursor: pointer;
`;

const NavList = styled.ul`
  margin-top: 20px;
  padding: 0;
`;

const Tooltip = styled.span`
  display: hidden;
  position: absolute;
  top: 10px;
  left: calc(100% + 15px);
  z-index: 3;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 15px;
  font-weight: 400;
  white-space: nowrap;
  opacity: 0;
  transform: translateY(-5px);
  transition: all 0.2s ease-in;
`;

const NavItem = styled.li`
  position: relative;
  padding: 5px 0;
  list-style: none;
  border-bottom: 2px solid #97979726;

  &:hover ${Tooltip} {
    display: block;
    opacity: 1;
    transform: translateY(0);
    background-color: white;
  }

  &:last-child {
    border-bottom: none;
  }
`;

const LinkWrapper = styled.div<{ $isActive: boolean }>`
  display: flex;
  align-items: center;
  text-decoration: none;
  background: ${({ $isActive }) => ($isActive ? Colors.sub1 : "transparent")};
  color: ${({ $isActive }) => ($isActive ? "#fff" : Colors.text)};
  border-radius: 12px;
  padding: 15px;

  &:hover {
    cursor: pointer;
    background-color: ${Colors.sub1};
    color: #fff;
    transition: background-color 0.5s ease;
    span,
    i {
      color: #fff;
    }
  }

  span {
    font-size: 15px;
    font-weight: 400;
    white-space: nowrap;
    margin-left: 10px;
  }

  i {
    font-size: 18px;
  }
`;

const ProfileWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  padding: 10px 14px;
  background: ${Colors.sub1};
  color: ${Colors.text};
  height: 70px;
  width: 250px;
  box-sizing: border-box;
  border-radius: 0px 0px 20px 20px;
  margin: 10px;
`;

const ProfileDetails = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
`;

const ProfileImage = styled.img`
  height: 45px;
  width: 45px;
  object-fit: cover;
  border-radius: 6px;
  margin-right: 10px;
`;

const NameJob = styled.div`
  .name {
    font-size: 15px;
    font-weight: 400;
    white-space: nowrap;
  }

  .job {
    font-size: 12px;
    white-space: nowrap;
  }
`;

const LogOutButton = styled.i`
  position: absolute;
  top: 30%;
  right: 0;
  min-width: 50px;
  font-size: 23px;
  text-align: right;
  padding-right: 14px;
  cursor: pointer;
`;
