import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { Box, IconButton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import {
  ArrowBackIos,
  ArrowForwardIosOutlined,
  ExitToApp,
  Groups,
  HomeOutlined,
  Leaderboard,
  ManageHistory,
  OndemandVideo,
  PeopleOutlined,
  Quiz,
  VideoCall,
  Web,
  Wysiwyg,
} from "@mui/icons-material";
import { GlobeAsiaAustraliaIcon } from "@heroicons/react/24/outline";

const Item = ({ title, to, icon, selected, setSelected }) => {
  return (
    <MenuItem
      active={selected === title}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography className="!text-[14px] !font-Poppins">{title}</Typography>
      <Link href={to} />
    </MenuItem>
  );
};

const AdminSidebar = () => {
  const { user } = useSelector((state) => state.auth);
  const [logout, setLogout] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return null;
  }

  const logoutHandler = () => {
    setLogout(true);
  };

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          backgroundColor: `${
            theme === "dark" ? "#000 !important" : "#fff !important"
          }`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item:hover": {
          color: "#98FB98	 !important",
        },
        "& .pro-menu-item.active": {
          color: "#98FB98	 !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
          opacity: 1,
        },
        "& .pro-menu-item": {
          color: `${theme !== "dark" && "#000"}`,
        },
      }}
      className="!bg-[crimson] dark:bg-[#111C43]"
    >
      <ProSidebar
        collapsed={isCollapsed}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          width: isCollapsed ? "0%" : "16%",
        }}
      >
        <Menu iconShape="square">
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <ArrowForwardIosOutlined /> : undefined}
            style={{
              margin: "10px 0 20px 0",
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                alignItems="center"
                gap="20px"
                justifyContent="center"
              >
                <Link href="/">
                  <h3 className="text-[20px] font-Poppins text-black dark:text-white">
                    govScheme
                  </h3>
                </Link>
                <IconButton
                  onClick={() => setIsCollapsed(!isCollapsed)}
                  className="inline-block"
                >
                  <ArrowBackIos className="text-black dark:text-[#ffffffc1]" />
                </IconButton>
              </Box>
            )}
            {!isCollapsed && (
              <Box mb="10px">
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  my="20px"
                >
                  <Image
                    alt="profile-user"
                    width={100}
                    height={100}
                    priority
                    src={user.avatar ? user.avatar.url : "/profile.png"}
                    style={{
                      cursor: "pointer",
                      borderRadius: "50%",
                      border: "3px solid #5F8575",
                    }}
                  />
                </Box>
                <Box textAlign="center">
                  <Typography
                    className="text-black dark:text-[#ffffffc1]"
                    variant="h4"
                    style={{ fontSize: "18px" }}
                    sx={{ m: "10px 0 0 0" }}
                  >
                    {user?.name}
                  </Typography>
                </Box>
              </Box>
            )}
          </MenuItem>

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/admin"
              icon={<HomeOutlined />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h5"
              className="!text-[17px] text-black dark:text-[#ffffffc1] capitalize !font-[600]"
              sx={{ m: "15px 0 5px 25px" }}
            >
              {!isCollapsed && "Data"}
            </Typography>
            <Item
              title="Users"
              to="/admin/users"
              icon={<Groups />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h5"
              className="!text-[17px] text-black dark:text-[#ffffffc1] capitalize !font-[600]"
              sx={{ m: "15px 0 5px 20px" }}
            >
              {!isCollapsed && "Content"}
            </Typography>
            <Item
              title="Create Scheme"
              to="/admin/create-scheme"
              icon={<VideoCall />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="All Schemes"
              to="/admin/schemes"
              icon={<OndemandVideo />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h5"
              className="!text-[17px] text-black dark:text-[#ffffffc1] capitalize !font-[600]"
              sx={{ m: "15px 0 5px 20px" }}
            >
              {!isCollapsed && "Customisation"}
            </Typography>
            <Item
              title="Hero"
              to="/admin/hero"
              icon={<Web />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="FAQ"
              to="/admin/faq"
              icon={<Quiz />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Categories"
              to="/admin/categories"
              icon={<Wysiwyg />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Ministries"
              to="/admin/ministries"
              icon={<Leaderboard />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="States"
              to="/admin/states"
              icon={<GlobeAsiaAustraliaIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h5"
              className="!text-[17px] text-black dark:text-[#ffffffc1] capitalize !font-[600]"
              sx={{ m: "15px 0 5px 25px" }}
            >
              {!isCollapsed && "Controllers"}
            </Typography>
            <Item
              title="Manage Team"
              to="/admin/team"
              icon={<PeopleOutlined />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h5"
              className="!text-[17px] text-black dark:text-[#ffffffc1] capitalize !font-[600]"
              sx={{ m: "15px 0 5px 20px" }}
            >
              {!isCollapsed && "Analytics"}
            </Typography>

            <Item
              title="Users Analytics"
              to="/admin/users-analytics"
              icon={<ManageHistory />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h5"
              className="!text-[17px] text-black dark:text-[#ffffffc1] capitalize !font-[600]"
              sx={{ m: "15px 0 5px 20px" }}
            >
              {!isCollapsed && "Extras"}
            </Typography>
            <div onClick={logoutHandler}>
              <Item
                title="Logout"
                to="/"
                icon={<ExitToApp />}
                selected={selected}
                setSelected={setSelected}
              />
            </div>
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default AdminSidebar;
