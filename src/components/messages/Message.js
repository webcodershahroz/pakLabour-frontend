import React from "react";

function Message() {
  return (
    <>
      <div class="flex h-[80vh] w-[96vw] gap-2 m-auto overflow-hidden my-4 gap-2 ">
        <div class="w-1/4 bg-white border rounded">
          <header class="p-4 border-b flex justify-between items-center">
            <h1 class="text-md font-semibold">Messages</h1>
          </header>

          <div class="overflow-y-auto h-full p-3 mb-9 pb-20">
            <div class="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
              <div class="w-12 h-12 bg-gray-300 rounded-full mr-3">
                <img
                  src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                  alt="User Avatar"
                  class="w-12 h-12 rounded-full"
                />
              </div>
              <div class="flex-1">
                <h2 class="text-md font-semibold">Alice</h2>
                <p class="text-gray-600 text-md">Hoorayy!!</p>
              </div>
            </div>

            <div class="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
              <div class="w-12 h-12 bg-gray-300 rounded-full mr-3">
                <img
                  src="https://placehold.co/200x/ad922e/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                  alt="User Avatar"
                  class="w-12 h-12 rounded-full"
                />
              </div>
              <div class="flex-1">
                <h2 class="text-md font-semibold">Martin</h2>
                <p class="text-gray-600 text-md">
                  That pizza place was amazing! We should go again sometime. 🍕
                </p>
              </div>
            </div>

            <div class="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
              <div class="w-12 h-12 bg-gray-300 rounded-full mr-3">
                <img
                  src="https://placehold.co/200x/2e83ad/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                  alt="User Avatar"
                  class="w-12 h-12 rounded-full"
                />
              </div>
              <div class="flex-1">
                <h2 class="text-md font-semibold">Charlie</h2>
                <p class="text-gray-600 text-md">
                  Hey, do you have any recommendations for a good movie to
                  watch?
                </p>
              </div>
            </div>

            <div class="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
              <div class="w-12 h-12 bg-gray-300 rounded-full mr-3">
                <img
                  src="https://placehold.co/200x/c2ebff/0f0b14.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                  alt="User Avatar"
                  class="w-12 h-12 rounded-full"
                />
              </div>
              <div class="flex-1">
                <h2 class="text-md font-semibold">David</h2>
                <p class="text-gray-600 text-md">
                  I just finished reading a great book! It was so captivating.
                </p>
              </div>
            </div>

            <div class="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
              <div class="w-12 h-12 bg-gray-300 rounded-full mr-3">
                <img
                  src="https://placehold.co/200x/e7c2ff/7315d1.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                  alt="User Avatar"
                  class="w-12 h-12 rounded-full"
                />
              </div>
              <div class="flex-1">
                <h2 class="text-md font-semibold">Ella</h2>
                <p class="text-gray-600 text-md">
                  What's the plan for this weekend? Anything fun?
                </p>
              </div>
            </div>

            <div class="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
              <div class="w-12 h-12 bg-gray-300 rounded-full mr-3">
                <img
                  src="https://placehold.co/200x/ffc2e2/ffdbdb.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                  alt="User Avatar"
                  class="w-12 h-12 rounded-full"
                />
              </div>
              <div class="flex-1">
                <h2 class="text-md font-semibold">Fiona</h2>
                <p class="text-gray-600 text-md">
                  I heard there's a new exhibit at the art museum. Interested?
                </p>
              </div>
            </div>

            <div class="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
              <div class="w-12 h-12 bg-gray-300 rounded-full mr-3">
                <img
                  src="https://placehold.co/200x/f83f3f/4f4f4f.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                  alt="User Avatar"
                  class="w-12 h-12 rounded-full"
                />
              </div>
              <div class="flex-1">
                <h2 class="text-md font-semibold">George</h2>
                <p class="text-gray-600 text-md">
                  I tried that new cafe downtown. The coffee was fantastic!
                </p>
              </div>
            </div>

            <div class="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
              <div class="w-12 h-12 bg-gray-300 rounded-full mr-3">
                <img
                  src="https://placehold.co/200x/dddddd/999999.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                  alt="User Avatar"
                  class="w-12 h-12 rounded-full"
                />
              </div>
              <div class="flex-1">
                <h2 class="text-md font-semibold">Hannah</h2>
                <p class="text-gray-600 text-md">
                  I'm planning a hiking trip next month. Want to join?
                </p>
              </div>
            </div>

            <div class="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
              <div class="w-12 h-12 bg-gray-300 rounded-full mr-3">
                <img
                  src="https://placehold.co/200x/70ff33/501616.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                  alt="User Avatar"
                  class="w-12 h-12 rounded-full"
                />
              </div>
              <div class="flex-1">
                <h2 class="text-md font-semibold">Ian</h2>
                <p class="text-gray-600 text-md">
                  Let's catch up soon. It's been too long!
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="flex-1 relative border rounded overflow-hidden">
          <header class="bg-white p-4 text-gray-700 border-b drop-shadow-sm flex items-center gap-2">
            <img
              src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
              alt="User Avatar"
              class="w-10 h-10 rounded-full"
            />
           <div>
           <a href="/workers/alice" class="text-xl font-semibold">Alice</a>
           <p className="text-xs">Last seen 10hr ago</p>
           </div>
          </header>

          <div class="h-screen overflow-y-auto p-4 pb-[185px]">
            <div class="flex mb-4 cursor-pointer">
              <div class="w-9 h-9 rounded-full flex items-center justify-center mr-2">
                <img
                  src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                  alt="User Avatar"
                  class="w-8 h-8 rounded-full"
                />
              </div>
              <div class="flex max-w-96 bg-white rounded-lg p-3 gap-3">
                <p class="text-gray-700">Hey Bob, how's it going?</p>
              </div>
            </div>
            <div class="flex justify-end mb-4 cursor-pointer">
              <div class="flex max-w-96 bg-brandcolor text-black rounded-lg p-3 gap-3">
                <p>
                  Hi Alice! I'm good, just finished a great book. How about you?
                </p>
              </div>
              <div class="w-9 h-9 rounded-full flex items-center justify-center ml-2">
                <img
                  src="https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                  alt="My Avatar"
                  class="w-8 h-8 rounded-full"
                />
              </div>
            </div>
          </div>

          <footer class="bg-white px-4 absolute bottom-0 w-full">
            <div class="flex items-center">
              <input
                type="text"
                placeholder="Type a message..."
                class="w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:border-brandcolor"
              />
              <button class="bg-black text-white font-bold px-4 py-2 rounded-md ml-2">
                Send
              </button>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}

export default Message;
