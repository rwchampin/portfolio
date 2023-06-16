import React, { useState } from "react";
import clsx from "clsx";
import { useSpring, animated, config } from "react-spring";

export default function Sidebar({ onSidebarHide, showSidebar }) {
    const [selected, setSelected] = useState("0");
    const { dashOffset, indicatorWidth, precentage } = useSpring({
      dashOffset: 26.015,
      indicatorWidth: 70,
      precentage: 77,
      from: { dashOffset: 113.113, indicatorWidth: 0, precentage: 0 },
      config: config.molasses,
    });
    return (
      <div
        className={clsx(
          "bg-card fixed inset-y-0 left-0 z-10 w-full flex-col sm:flex sm:w-20 xl:w-60",
          showSidebar ? "flex" : "hidden",
        )}
      >
        <div className="flex-shrink-0 overflow-hidden p-2">
          <div className="sidebar-separator-top flex h-full items-center p-2 sm:justify-center xl:justify-start">
            <IconButton icon="res-react-dash-logo" className="h-10 w-10" />
            <div className="ml-2 block text-xl font-bold text-white sm:hidden xl:block">
              React
            </div>
            <div className="flex-grow sm:hidden xl:block" />
            <IconButton
              icon="res-react-dash-sidebar-close"
              className="block sm:hidden"
              onClick={onSidebarHide}
            />
          </div>
        </div>
        <div className="flex flex-grow flex-col overflow-y-auto overflow-x-hidden">
          <div className="hidden h-24 w-full flex-shrink-0 p-3 sm:block sm:h-20 xl:h-24">
            <div className="bg-sidebar-card-top flex h-full w-full items-center justify-start rounded-xl px-3 sm:justify-center sm:px-0 xl:justify-start xl:px-3">
              <Icon path="res-react-dash-sidebar-card" className="h-9 w-9 " />
              <div className="ml-3 block sm:hidden xl:block">
                <div className="text-sm font-bold text-white">Sales House</div>
                <div className="text-sm">General Item</div>
              </div>
              <div className="block flex-grow sm:hidden xl:block" />
              <Icon
                path="res-react-dash-sidebar-card-select"
                className="block h-5 w-5 sm:hidden xl:block"
              />
            </div>
          </div>
          {sidebarItems[0].map((i) => (
            <MenuItem
              key={i.id}
              item={i}
              onClick={setSelected}
              selected={selected}
            />
          ))}
          <div className="mb-0 mt-8 block px-3 font-bold sm:hidden xl:block">
            SHORTCUTS
          </div>
          {sidebarItems[1].map((i) => (
            <MenuItem
              key={i.id}
              item={i}
              onClick={setSelected}
              selected={selected}
            />
          ))}
          <div className="flex-grow" />
          <div className="hidden h-28 w-full p-3 sm:block sm:h-20 xl:h-32">
            <div
              className="h-full w-full overflow-hidden rounded-xl px-3 sm:px-0 xl:px-3"
              style={{
                backgroundImage:
                  "url('https://assets.codepen.io/3685267/res-react-dash-usage-card.svg')",
              }}
            >
              <div className="block pt-3 sm:hidden xl:block">
                <div className="text-sm font-bold text-gray-300">Used Space</div>
                <div className="text-xs text-gray-500">
                  Admin updated 09:12 am November 08,2020
                </div>
                <animated.div className="text-right text-xs text-gray-400">
                  {precentage.interpolate((i) => `${Math.round(i)}%`)}
                </animated.div>
                <div className="w-full text-gray-300">
                  <svg
                    viewBox="0 0 100 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <line
                      x1="5"
                      y1="5.25"
                      x2="95"
                      y2="5.25"
                      stroke="#3C3C3C"
                      strokeWidth="5"
                      strokeLinecap="round"
                    />
                    <animated.line
                      x1="5"
                      y1="5.25"
                      x2={indicatorWidth}
                      y2="5.25"
                      stroke="currentColor"
                      strokeWidth="5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>
  
              <div className="hidden sm:block xl:hidden ">
                <svg
                  width="56"
                  height="56"
                  viewBox="0 0 56 56"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="56" height="56" fill="#2C2C2D" />
                  <path
                    d="M 28 28 m 0, -18 a 18 18 0 0 1 0 36 a 18 18 0 0 1 0 -36"
                    stroke="#3C3C3C"
                    strokeWidth="6"
                  />
                  <animated.path
                    d="M 28 28 m 0, -18 a 18 18 0 0 1 0 36 a 18 18 0 0 1 0 -36"
                    stroke="#fff"
                    strokeLinecap="round"
                    strokeDasharray="113.113"
                    strokeDashoffset={dashOffset}
                    strokeWidth="6"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
  
        <div className="flex-shrink-0 overflow-hidden p-2">
          <div className="sidebar-separator-bottom flex h-full items-center p-2 sm:justify-center xl:justify-start">
            <Image path="mock_faces_8" className="h-10 w-10" />
            <div className="ml-2 block font-bold sm:hidden xl:block ">
              Jerry Wilson
            </div>
            <div className="block flex-grow sm:hidden xl:block" />
            <Icon
              path="res-react-dash-options"
              className="block h-3 w-3 sm:hidden xl:block"
            />
          </div>
        </div>
      </div>
    );
  }