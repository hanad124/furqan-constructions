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
import { TbUserSquare } from "react-icons/tb";
import {
  HiUsers,
  HiViewList,
  HiShoppingCart,
  HiOutlineSwitchHorizontal,
  HiOutlineUserCircle,
  HiDocumentReport,
  HiChartBar,
  HiCreditCard,
  HiOutlineLogout,
  HiOutlineCube,
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
    text: "Employees",
    url: "/dashboard/employee",
    submenus: [],
  },
  {
    icon: TbUserSquare,
    text: "Suppliers",
    url: "/dashboard/suppliers",
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
    url: "/dashboard/purchase",
    submenus: [],
  },
  {
    icon: HiOutlineSwitchHorizontal,
    text: "Transfer",
    url: "/dashboard/transfer",
    submenus: [],
  },
  {
    icon: HiOutlineUserCircle,
    text: "Customers",
    url: "/dashboard/customers",
    submenus: [],
  },
  {
    icon: HiDocumentReport,
    url: "",
    text: "Invoice",
    submenus: [
      { text: "Cash", url: "/dashboard/invoices/cash" },
      { text: "Credit", url: "/dashboard/invoices/credit" },
    ],
  },
  // { icon: HiChartBar, text: "Stock", url: "/dashboard/stock", submenus: [] },
  {
    icon: HiCreditCard,
    text: "Expense",
    url: "/dashboard/expense",
    submenus: [],
  },
  // { icon: FaCog, text: "Settings",
  // submenus: [] },
  {
    icon: HiMiniBuildingLibrary,
    text: "Bank",
    url: "/dashboard/bank",
    submenus: [],
  },
  {
    icon: HiMiniCheckCircle,
    text: "Clearance",
    url: "/dashboard/clearance",
    submenus: [],
  },
  {
    icon: HiDocumentDuplicate,
    url: "",
    text: "Reports",
    submenus: [
      { text: "All reports", url: "/dashboard/all-reports" },
      { text: "Stock report", url: "/dashboard/stock-report" },
    ],
  },
  // {
  //   icon: HiOutlineCube,
  //   url: "/dashboard/entities",
  //   text: "Entities",
  //   submenus: [],
  // },
  {
    icon: HiUsers,
    HiViewList,
    text: "Users",
    url: "/dashboard/users",
    submenus: [],
  },
  // {
  //   icon: HiOutlineLogout,
  //   text: "Log out",
  //   url: "",
  //   submenus: [],
  // },
  // { icon: FaArrowRightFromBracket, HiViewList, text: "Log out", submenus: [] },
];
