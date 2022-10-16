import React, { useEffect, useState, useRef } from "react";
import { Tabs, Tab, Box, Paper } from "@mui/material";
export default function TabsWithScroll({ tabs = [], ...rest }) {
  const [currentTabIndex, setCurrentTabIndex] = useState("");
  const tabsNavigator = useRef(null);
  const placeHolder = useRef(null);
  const navigatorPosition = useRef(null);
  //handle tabs change
  function handleTabChange(index, newIndex) {
    setCurrentTabIndex(newIndex);
    const scrollToElement = document.getElementById(newIndex);
    if (scrollToElement) {
      const y = scrollToElement.getBoundingClientRect().y;
      window.scrollTo(
        0,
        window.scrollY +
          y -
          tabsNavigator.current.getBoundingClientRect().height
      );
    }
  }
  //stick tabs to top when scroll pass it
  useEffect(() => {
    navigatorPosition.current =
      window.scrollY + tabsNavigator.current.getBoundingClientRect().y;
    window.addEventListener("resize", () => {
      navigatorPosition.current =
        window.scrollY + tabsNavigator.current.getBoundingClientRect().y;
      calculateTabsPositionAndStyle();
    });
    const scrollHandler = () => {
      calculateTabsPositionAndStyle();
    };
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);

  function calculateTabsPositionAndStyle() {
    const deltaTop = tabsNavigator.current.getBoundingClientRect().y;
    const placeHolderWidth = placeHolder.current.getBoundingClientRect().width;
    if (window.scrollY < navigatorPosition.current) {
      tabsNavigator.current.style.width = "100%";
      tabsNavigator.current.style.position = "static";
    } else if (deltaTop < 0.0005) {
      tabsNavigator.current.style.top = "0px";
      tabsNavigator.current.style.left =
        placeHolderWidth < window.innerWidth
          ? "0px"
          : placeHolder.current.getBoundingClientRect().left + "px";
      tabsNavigator.current.style.width =
        placeHolderWidth < window.innerWidth
          ? "100vw"
          : placeHolderWidth + "px";
      tabsNavigator.current.style.zIndex = 999999;
      tabsNavigator.current.style.position = "fixed";
    }
  }
  //set tabs current index on scroll
  useEffect(() => {
    const tabSections = [];
    tabs.forEach((tab) =>
      tabSections.push({
        el: document.querySelector(tab.section),
        section: tab.section,
        value: tab.value,
      })
    );
    const scrollHandler = () => {
      tabSections.forEach((tab) => {
        const min = tab.el.offsetTop - 50;
        const currentY = window.scrollY;
        const max = tab.el.offsetTop + tab.el.getBoundingClientRect().height;

        if (min < currentY && currentY < max - 50) {
          console.log({ Y: window.scrollY });

          setCurrentTabIndex(tab.value);
        }
      });
    };
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);
  return (
    <Box sx={{ width: "100%" }} ref={placeHolder}>
      <Tabs
        elevation={4}
        component={Paper}
        sx={{ background: "background.paper" }}
        variant="scrollable"
        id={"tabs_navigator"}
        ref={tabsNavigator}
        value={currentTabIndex}
        indicatorColor="primary"
        index={1}
        dir="rtl"
        onChange={handleTabChange}
        direction="horizontal">
        {tabs.map((tab) => (
          <Tab key={tab.id} value={tab.value} label={tab.title} />
        ))}
      </Tabs>
    </Box>
  );
}
