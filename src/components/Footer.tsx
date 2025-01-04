import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import { SiMastercard, SiPaypal, SiVisa } from "react-icons/si";
import logo from "../assets/images/logo.png";

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-white pt-16 pb-8 mt-28">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-12">
          {/* Company Info */}
          <div className="lg:col-span-3">
            <a href="/" className="flex items-center">
              <img src={logo} alt="Fresh" className="h-20 w-auto" />
              <p className="text-xl font-bold">
                FRESH <span className="text-pink-500">SPARE</span>
              </p>
            </a>

            <p className="text-black font-semibold mb-4">
              71 Pilgrim Avenue Chevy Chase,
              <br />
              east california.
            </p>
            <div className="space-y-2">
              <p className="text-black font-semibold">
                <span className="font-semibold">Call Us: </span>
                <a
                  href="tel:+44 0123 456 789"
                  className="hover:text-green-700 font-medium"
                >
                  +44 0123 456 789
                </a>
              </p>
              <p className="text-black ">
                <span className="font-semibold">Email: </span>
                <a
                  href="mailto:example@ec-email.com"
                  className="hover:text-green-700 font-medium"
                >
                  freshspare@gmail.com
                </a>
              </p>
            </div>
          </div>

          {/* Information */}
          <div className="lg:col-span-2 md:col-span-1">
            <h3 className="text-lg font-semibold mb-6">Information</h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="/about"
                  className="text-black font-medium hover:text-green-700"
                >
                  About us
                </a>
              </li>
              <li>
                <a
                  href="/faq"
                  className="text-black font-medium hover:text-green-700"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="/delivery"
                  className="text-black font-medium hover:text-green-700"
                >
                  Delivery Information
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-black font-medium hover:text-green-700"
                >
                  Contact us
                </a>
              </li>
            </ul>
          </div>

          {/* Account */}
          <div className="lg:col-span-2 md:col-span-1">
            <h3 className="text-lg font-medium mb-6">Account</h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="/account"
                  className="text-black font-medium hover:text-green-700"
                >
                  My Account
                </a>
              </li>
              <li>
                <a
                  href="/orders"
                  className="text-black font-medium hover:text-green-700"
                >
                  Order History
                </a>
              </li>
              <li>
                <a
                  href="/wishlist"
                  className="text-black font-medium hover:text-green-700"
                >
                  Wish List
                </a>
              </li>
              <li>
                <a
                  href="/specials"
                  className="text-black font-medium hover:text-green-700"
                >
                  Specials
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-2 md:col-span-1">
            <h3 className="text-lg font-medium mb-6">Services</h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="/returns"
                  className="text-black font-medium hover:text-green-700"
                >
                  Discount Returns
                </a>
              </li>
              <li>
                <a
                  href="/policy"
                  className="text-black font-medium hover:text-green-700"
                >
                  Policy & policy
                </a>
              </li>
              <li>
                <a
                  href="/customer-service"
                  className="text-black font-medium hover:text-green-700"
                >
                  Customer Service
                </a>
              </li>
              <li>
                <a
                  href="/term-condition"
                  className="text-black font-medium hover:text-green-700"
                >
                  Term & condition
                </a>
              </li>
            </ul>
          </div>

          
          <div className="lg:col-span-3 md:col-span-2">
            <h3 className="text-lg font-semibold mb-6">Newsletter</h3>
            <p className="text-black font-medium mb-4">
              Get instant updates about our new products and special promos!
            </p>
            <form className="flex gap-2 mb-6">
              <input
                type="email"
                placeholder="Enter your email here..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <button
                type="submit"
                className="px-2 py-2 bg-green-700  rounded-md hover:bg-green-700 focus:outline-none  focus:ring-2 text-white font-semibold  focus:ring-offset-2"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-4 border-t border-gray-200">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 items-center">
          
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-green-700">
                <FaFacebookF className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-700">
                <FaTwitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-700">
                <FaInstagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-700">
                <FaLinkedinIn className="h-6 w-6" />
              </a>
            </div>

            {/* Copyright */}
            <div className="text-center font-medium">
              <p>
                Copyright © {new Date().getFullYear()}{" "}
                <span className="!font-bold">
                  FRESH <span className="text-pink-500">SPARE</span>
                </span>
                . All Rights Reserved
              </p>
            </div>

            {/* Payment Methods */}
            <div className="flex justify-end gap-2">
              <SiVisa className="h-8 w-12 text-gray-400" />
              <SiMastercard className="h-8 w-12 text-gray-400" />
              <SiPaypal className="h-8 w-12 text-gray-400" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
