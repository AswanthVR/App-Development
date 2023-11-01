import React, { useState } from 'react';

const MegaMenu = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <section className="mb-32">
      <nav className="flex-no-wrap relative flex w-full items-center justify-between bg-white py-2 shadow-md shadow-black/5 dark:bg-neutral-600 dark:shadow-black/10 lg:flex-wrap lg:justify-start lg:py-2.5" data-te-navbar-ref>
        <div className="flex w-full flex-wrap items-center justify-between px-3">
          <button className="block border-0 bg-transparent px-2 text-neutral-500 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 dark:text-neutral-200 lg:hidden" type="button" data-te-collapse-init data-te-target="#navbarSupportedContentX" aria-controls="navbarSupportedContentX" aria-expanded={isDropdownOpen} aria-label="Toggle navigation" onClick={toggleDropdown}>
            <span className="[&>svg]:w-7">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7">
                <path fillRule="evenodd" d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" clipRule="evenodd" />
              </svg>
            </span>
          </button>
          <div className={`!visible hidden flex-grow basis-[100%] items-center lg:!flex lg:basis-auto`} id="navbarSupportedContentX" data-te-collapse-item>
            <ul className="mr-auto flex flex-row" data-te-navbar-nav-ref>
              <li className="static" data-te-nav-item-ref data-te-dropdown-ref>
                <a className="flex items-center whitespace-nowrap py-2 px-2 text-neutral-600 transition duration-300 ease-in-out focus:text-neutral-700 dark:text-neutral-200 dark:hover:text-neutral-100 dark:focus:text-neutral-100" href="#" data-te-ripple-init data-te-ripple-color="light" type="button" id="dropdownMenuButtonX" data-te-dropdown-toggle-ref aria-expanded={isDropdownOpen} data-te-nav-link-ref onClick={toggleDropdown}>
                  Click me
                  <span className="ml-2 w-2">
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="caret-down" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                      <path fill="currentColor" d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"></path>
                    </svg>
                  </span>
                </a>
                <div className={`absolute left-0 top-full right-0 z-[1000] mt-0 ${isDropdownOpen ? 'block' : 'hidden'} w-full border-none bg-white bg-clip-padding shadow-lg shadow-black/5 dark:bg-neutral-700`} aria-labelledby="dropdownMenuButtonX" data-te-dropdown-menu-ref>
                  <div className="mx-4 py-5 md:px-6 lg:px-8">
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                      <ul>
                        <li>
                          <a className="flex w-full items-center whitespace-nowrap bg-transparent py-3 px-4 text-sm font-normal text-neutral-700 transition duration-300 ease-in-out hover:bg-neutral-50 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600" href="#" data-te-dropdown-item-ref>
                            <img src="https://mdbcdn.b-cdn.net/wp-content/themes/mdbootstrap4/content/en/_mdb5/_assets/img/icons/mdb-new.png" alt="" className="mr-3 w-6" />
                            <span>MDBootstrap</span>
                          </a>
                        </li>
                        {/* Add more list items here */}
                      </ul>
                      <ul>
                        <li>
                          <a className="flex w-full items-center whitespace-nowrap bg-transparent py-3 px-4 text-sm font-normal text-neutral-700 transition duration-300 ease-in-out hover:bg-neutral-50 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600" href="#" data-te-dropdown-item-ref>
                            <img src="https://mdbcdn.b-cdn.net/wp-content/themes/mdbootstrap4/content/en/_mdb5/_assets/img/icons/react.png" alt="" className="mr-3 w-6" />
                            <span>React</span>
                          </a>
                        </li>
                        {/* Add more list items here */}
                      </ul>
                      {/* Add more lists here */}
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </section>
  );
}

export default MegaMenu;
