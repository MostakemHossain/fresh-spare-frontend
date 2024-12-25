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
    <footer className="w-full bg-white pt-16 pb-8">
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

            <p className="text-gray-600 mb-4">
              71 Pilgrim Avenue Chevy Chase,
              <br />
              east california.
            </p>
            <div className="space-y-2">
              <p className="text-gray-600">
                <span className="font-semibold">Call Us: </span>
                <a href="tel:+44 0123 456 789" className="hover:text-blue-600">
                  +44 0123 456 789
                </a>
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Email: </span>
                <a
                  href="mailto:example@ec-email.com"
                  className="hover:text-blue-600"
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
                <a href="/about" className="text-gray-600 hover:text-blue-600">
                  About us
                </a>
              </li>
              <li>
                <a href="/faq" className="text-gray-600 hover:text-blue-600">
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="/delivery"
                  className="text-gray-600 hover:text-blue-600"
                >
                  Delivery Information
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-gray-600 hover:text-blue-600"
                >
                  Contact us
                </a>
              </li>
            </ul>
          </div>

          {/* Account */}
          <div className="lg:col-span-2 md:col-span-1">
            <h3 className="text-lg font-semibold mb-6">Account</h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="/account"
                  className="text-gray-600 hover:text-blue-600"
                >
                  My Account
                </a>
              </li>
              <li>
                <a href="/orders" className="text-gray-600 hover:text-blue-600">
                  Order History
                </a>
              </li>
              <li>
                <a
                  href="/wishlist"
                  className="text-gray-600 hover:text-blue-600"
                >
                  Wish List
                </a>
              </li>
              <li>
                <a
                  href="/specials"
                  className="text-gray-600 hover:text-blue-600"
                >
                  Specials
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-2 md:col-span-1">
            <h3 className="text-lg font-semibold mb-6">Services</h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="/returns"
                  className="text-gray-600 hover:text-blue-600"
                >
                  Discount Returns
                </a>
              </li>
              <li>
                <a href="/policy" className="text-gray-600 hover:text-blue-600">
                  Policy & policy
                </a>
              </li>
              <li>
                <a
                  href="/customer-service"
                  className="text-gray-600 hover:text-blue-600"
                >
                  Customer Service
                </a>
              </li>
              <li>
                <a
                  href="/term-condition"
                  className="text-gray-600 hover:text-blue-600"
                >
                  Term & condition
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-3 md:col-span-2">
            <h3 className="text-lg font-semibold mb-6">Newsletter</h3>
            <p className="text-gray-600 mb-4">
              Get instant updates about our new products and special promos!
            </p>
            <form className="flex gap-2 mb-6">
              <input
                type="email"
                placeholder="Enter your email here..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="px-2 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 items-center">
            {/* Social Links */}
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-blue-600">
                <FaFacebookF className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-600">
                <FaTwitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-600">
                <FaInstagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-600">
                <FaLinkedinIn className="h-6 w-6" />
              </a>
            </div>

            {/* Copyright */}
            <div className="text-center ">
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
