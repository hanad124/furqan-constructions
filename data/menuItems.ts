import {
  FaHome,
  FaUsers,
  FaCog,
  FaChevronCircleRight,
  FaChevronUp,
} from "react-icons/fa";
import { RiDashboardLine } from "react-icons/ri";
import {
  HiMiniBuildingLibrary,
  HiMiniCheckCircle,
  HiDocumentDuplicate,
} from "react-icons/hi2";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import {
  HiUsers,
  HiViewList,
  HiShoppingCart,
  HiOutlineSwitchHorizontal,
  HiOutlineUserCircle,
  HiDocumentReport,
  HiChartBar,
  HiCreditCard,
} from "react-icons/hi";

export const menuItems = [
  //   { icon: FaHome, text: "Home", submenus: [] },
  {
    icon: RiDashboardLine,
    text: "Dashboard",
    url: "/dashboard" || "/",
    submenus: [],
  },
  {
    icon: FaUsers,
    text: "Emaployee",
    url: "/dashboard/employee",
    submenus: [],
  },
  {
    icon: HiViewList,
    text: "Item List",
    url: "/dashboard/items-list",
    submenus: [],
  },
  {
    icon: HiShoppingCart,
    text: "Purchase",
    url: "",
    submenus: [
      { text: "Containers", url: "/containers" },
      { text: "Market", url: "/market" },
    ],
  },
  {
    icon: HiOutlineSwitchHorizontal,
    text: "Transfer",
    url: "/transfer",
    submenus: [],
  },
  {
    icon: HiOutlineUserCircle,
    text: "Customers",
    url: "/customers",
    submenus: [],
  },
  {
    icon: HiDocumentReport,
    url: "",
    text: "Invoice",
    submenus: [
      { text: "Cash", url: "/dashboard/invoices/cash" },
      { text: "Credit", url: "/credit" },
    ],
  },
  { icon: HiChartBar, text: "Stock", url: "/stock", submenus: [] },
  { icon: HiCreditCard, text: "Expense", url: "/expense", submenus: [] },
  // { icon: FaCog, text: "Settings",
  // submenus: [] },
  { icon: HiMiniBuildingLibrary, text: "Bank", url: "/bank", submenus: [] },
  {
    icon: HiMiniCheckCircle,
    text: "Clearance",
    url: "/clearance",
    submenus: [],
  },
  {
    icon: HiDocumentDuplicate,
    url: "",
    text: "Reports",
    submenus: [
      { text: "Single report", url: "/single-report" },
      { text: "All reports", url: "/all-reports" },
    ],
  },
  {
    icon: HiUsers,
    HiViewList,
    text: "Users",
    url: "/dashboard/users",
    submenus: [],
  },
  // { icon: FaArrowRightFromBracket, HiViewList, text: "Log out", submenus: [] },
];
