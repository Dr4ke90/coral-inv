"use client";
import { useState } from "react";
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
} from "@mui/icons-material";
import { useEquipmentFilter } from "@/contexts/EquipmentFilterContext";
import { equipmentMenuItems } from "@/constants/equipmentMenuItems";

const EqSideBar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const { selectedGroup, setSelectedGroup } = useEquipmentFilter();

  return (
    <Box
      className={`h-screen bg-blue-500/50 text-slate-200 flex flex-col p-2 border-r border-slate-800 transition-all duration-300 ease-in-out ${
        isExpanded ? "w-64" : "w-20"
      }`}
    >
      {/* ################ Header & Toggle Button ################## */}
      <Box
        className={`flex items-center mb-4 p-2 ${
          isExpanded ? "justify-between" : "justify-center"
        }`}
      >
        {isExpanded && (
          <span className="font-bold text-white text-lg tracking-wide truncate">
            Categorii
          </span>
        )}
        <IconButton
          onClick={() => setIsExpanded((prev) => !prev)}
          className="text-slate-400 hover:text-white hover:bg-slate-800"
        >
          {isExpanded ? <ChevronLeftIcon /> : <MenuIcon />}
        </IconButton>
      </Box>

      {/* ################ Lista de Navigare MUI ################## */}
      <List component="nav" disablePadding className="flex-1 space-y-1">
        {equipmentMenuItems.map((item) => {
          const isSelected = selectedGroup === item.value;

          return (
            <ListItem key={item.value} disablePadding className="block">
              <Tooltip
                title={!isExpanded ? item.text : ""}
                placement="right"
                arrow
              >
                <ListItemButton
                  selected={isSelected}
                  onClick={() => setSelectedGroup(item.value)}
                  className={`min-h-[48px] rounded-xl transition-colors ${
                    isExpanded ? "justify-start px-3" : "justify-center px-0"
                  }`}
                >
                  <ListItemIcon
                    className={`min-w-0 ${isExpanded ? "mr-4" : "mr-0"}`}
                  >
                    {item.icon}
                  </ListItemIcon>

                  <ListItemText
                    primary={item.text}
                    className={`whitespace-nowrap transition-opacity duration-300 ${
                      isExpanded ? "block opacity-100" : "hidden opacity-0"
                    }`}
                  />
                </ListItemButton>
              </Tooltip>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};

export default EqSideBar;
