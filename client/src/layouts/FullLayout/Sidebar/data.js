import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import AddToPhotosOutlinedIcon from '@mui/icons-material/AddToPhotosOutlined';
import AspectRatioOutlinedIcon from '@mui/icons-material/AspectRatioOutlined';
import SwitchCameraOutlinedIcon from '@mui/icons-material/SwitchCameraOutlined';
import SwitchLeftOutlinedIcon from '@mui/icons-material/SwitchLeftOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import AutoAwesomeMosaicOutlinedIcon from '@mui/icons-material/AutoAwesomeMosaicOutlined';

const Menuitems = {
  admin: [
    { title: "Dashboard", icon: DashboardOutlinedIcon, href: "/admin" },
    { title: "All Users", icon: AddToPhotosOutlinedIcon, href: "/studentTable" },
    { title: "All Courses", icon: AspectRatioOutlinedIcon, href: "/courseTable" },
  ],
  student: [
    { title: "Dashboard", icon: DashboardOutlinedIcon, href: "/dashboard" },
    { title: "Send File", icon: AddToPhotosOutlinedIcon, href: "/add-pastquestion" },
    { title: "Send To Friend", icon: AspectRatioOutlinedIcon, href: "/search" },
  ],
  lecturer: [
    { title: "Dashboard", icon: SwitchLeftOutlinedIcon, href: "/lecturer-dashboard" },
    { title: "Add Course", icon: SwitchCameraOutlinedIcon, href: "/add-course" },
  ],
  guest: [
    { title: "Login", icon: DescriptionOutlinedIcon, href: "/login" },
    { title: "Register", icon: AutoAwesomeMosaicOutlinedIcon, href: "/register" },
  ],
};

export default Menuitems;
