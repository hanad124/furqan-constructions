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
    submenus: [],
  },
  { icon: FaUsers, text: "Emaployee", submenus: [] },
  { icon: HiViewList, text: "Item List", submenus: [] },
  {
    icon: HiShoppingCart,
    text: "Purchase",
    submenus: [
      { text: "Containers", url: "/dashboard/containers" },
      { text: "Market", url: "/dashboard/market" },
    ],
  },
  { icon: HiOutlineSwitchHorizontal, text: "Transfer", submenus: [] },
  { icon: HiOutlineUserCircle, text: "Customers", submenus: [] },
  {
    icon: HiDocumentReport,
    text: "Invoice",
    submenus: [
      { text: "Cash", url: "/dashboard/cash" },
      { text: "Credit", url: "/dashboard/credit" },
    ],
  },
  { icon: HiChartBar, text: "Stock", submenus: [] },
  { icon: HiCreditCard, text: "Expense", submenus: [] },
  { icon: HiMiniBuildingLibrary, text: "Bank", submenus: [] },
  { icon: HiMiniCheckCircle, text: "Clearance", submenus: [] },
  {
    icon: HiDocumentDuplicate,
    text: "Reports",
    submenus: [
      { text: "All reports", url: "/dashboard/all-reports" },
      { text: "Single report", url: "/dashboard/single-report" },
    ],
  },
  { icon: HiUsers, HiViewList, text: "Users", submenus: [] },
  { icon: FaArrowRightFromBracket, HiViewList, text: "Log out", submenus: [] },
];
