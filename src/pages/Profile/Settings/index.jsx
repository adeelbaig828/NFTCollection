import React, { useState } from "react";
import { Input, Form, Button, Switch } from "antd";
import $ from "jquery";
import "./index.scss";
import HEADER_EDIT_MOBILE from "../../../images/PageHeader.png";
import Account from "./Account";
import Security from "./Security";
import Notification from "./Notification";
import ChangePassword from "./ChangePassword";
const Settings = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const handleClick = (index) => {
    setActiveIndex(index);
  };
  const checkActive = (index, className) =>
    activeIndex === index ? className : "";
  if ($(window).width() < 767) {
    $(
      ".edit_profile_1.main_page_width.padding_add, .editprofileHeader_main"
    ).addClass("active_mobile_function");
    $(".active_mobile_function .edit_profile_wrapper .tabs_main p.tab").click(
      function () {
        $(
          ".active_mobile_function .edit_profile_wrapper .edit_profile_tabs_data"
        ).show();
        $(
          ".active_mobile_function .edit_profile_wrapper .edit_profile_tabs"
        ).hide();
        $(".active_mobile_function .editprofileText").show();
        var data_heading = $(this).children(".ac_t_mb").html();
        $(".active_mobile_function .back_txt_pr_mb8 span").html(data_heading);
      }
    );
    $(".active_mobile_function .editprofileText").click(function () {
      $(
        ".active_mobile_function .edit_profile_wrapper .edit_profile_tabs"
      ).show();
      $(".active_mobile_function .editprofileText").hide();
      $(".active_mobile_function .back_txt_pr_mb8 span").html("Edit profile");
    });
    $(".active_mobile_function .editprofileText").click(function () {
      $(
        ".active_mobile_function .edit_profile_wrapper .edit_profile_tabs_data"
      ).hide();
      $(
        ".active_mobile_function .edit_profile_wrapper .edit_profile_tabs"
      ).show();
    });
  } else {
    $(
      ".edit_profile_1.main_page_width.padding_add, .editprofileHeader_main"
    ).removeClass("active_mobile_function");
  }

  $(window).resize(function () {
    if ($(window).width() < 767) {
      $(
        ".edit_profile_1.main_page_width.padding_add, .editprofileHeader_main"
      ).addClass("active_mobile_function");
      $(".active_mobile_function .edit_profile_wrapper .tabs_main p.tab").click(
        function () {
          $(
            ".active_mobile_function .edit_profile_wrapper .edit_profile_tabs_data"
          ).show();
          $(
            ".active_mobile_function .edit_profile_wrapper .edit_profile_tabs"
          ).hide();
          $(".active_mobile_function .editprofileText").show();
          var data_heading = $(this).children(".ac_t_mb").html();
          $(".active_mobile_function .back_txt_pr_mb8 span").html(data_heading);
        }
      );
      $(".active_mobile_function .editprofileText").click(function () {
        $(
          ".active_mobile_function .edit_profile_wrapper .edit_profile_tabs"
        ).show();
        $(".active_mobile_function .editprofileText").hide();
        $(".active_mobile_function .back_txt_pr_mb8 span").html("Edit profile");
      });
      $(".active_mobile_function .editprofileText").click(function () {
        $(
          ".active_mobile_function .edit_profile_wrapper .edit_profile_tabs_data"
        ).hide();
        $(
          ".active_mobile_function .edit_profile_wrapper .edit_profile_tabs"
        ).show();
      });
      $(".edit_profile_wrapper .edit_profile_tabs_data").hide();
    } else {
      $(
        ".edit_profile_1.main_page_width.padding_add, .editprofileHeader_main"
      ).removeClass("active_mobile_function");
      $(
        ".edit_profile_wrapper .edit_profile_tabs, .edit_profile_wrapper .edit_profile_tabs_data"
      ).show();
    }
  });

  return (
    <>
      <div className="bg_banner_1"></div>

      <div className="editprofileHeader_main">
        <div className="editprofileHeader">
          <img src={HEADER_EDIT_MOBILE} alt={HEADER_EDIT_MOBILE} />
          <div className="editprofileHeadingSection">
            <div className="editprofileText">
              <span class="chevron_icon_btn left_cev"></span>{" "}
              <span className="my_ac_mb_tx">Settings</span>
            </div>
            <div className="back_txt_pr_mb8">
              <span>Settings</span>
            </div>
          </div>
        </div>
      </div>

      <div className="back_profile_btn main_page_width">
        <div className="flex_hr_ap padding_add">
          <div className="back_btn_pr_wrapper">
            <div className="back_txt_pr">
              <span>Settings</span>
            </div>
          </div>
          <hr />
        </div>
      </div>

      <div className="edit_profile_1 main_page_width padding_add">
        <div className="edit_profile_wrapper">
          <div className="edit_profile_tabs">
            <div className="tabs_main">
              <p
                className={`active_tabac tab ${checkActive(1, "active")}`}
                onClick={() => handleClick(1)}
              >
                <span className="ac_t_mb">Account</span>
                <span class="chevron_icon_btn left_cev"></span>
              </p>
            </div>
            <div className="tabs_main">
              <p
                className={`tab ${checkActive(2, "active")}`}
                onClick={() => handleClick(2)}
              >
                <span className="ac_t_mb">Security</span>
                <span class="chevron_icon_btn left_cev"></span>
              </p>
            </div>
            <div className="tabs_main">
              <p
                className={`tab ${checkActive(3, "active")}`}
                onClick={() => handleClick(3)}
              >
                <span className="ac_t_mb">Notifications</span>
                <span class="chevron_icon_btn left_cev"></span>
              </p>
            </div>
            <div className="tabs_main">
              <p
                className={`active_tabac tab ${checkActive(4, "active")}`}
                onClick={() => handleClick(4)}
              >
                <span className="ac_t_mb">Change Password</span>
                <span class="chevron_icon_btn left_cev"></span>
              </p>
            </div>
          </div>
          
          <div className="edit_profile_tabs_data">
            <div className="edit_profile_tabs_inner">
              <div
                className={`account_data_tab fields_data edit_profile_panel ${checkActive(
                  1,
                  "active"
                )}`}
              >
                <div className="fields_inner">
                  <Account />
                </div>
              </div>

              <div
                className={`security_data_tab edit_profile_panel ${checkActive(
                  2,
                  "active"
                )}`}
              >
                <div className="_space_inner_de">
                  <div className="fields_inner">
                    <Security />
                  </div>
                </div>
              </div>
              <div
                className={`notification_data_tab edit_profile_panel ${checkActive(
                  3,
                  "active"
                )}`}
              >
                <div className="fields_inner">
                  <Notification />
                </div>
              </div>
              <div
                className={`security_data_tab edit_profile_panel ${checkActive(
                  4,
                  "active"
                )}`}
              >
                <div className="_space_inner_de">
                  <div className="fields_inner">
                    <ChangePassword />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Settings;
