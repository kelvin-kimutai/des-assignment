import DecryptForm from "@/components/forms/decrypt";
import EncryptForm from "@/components/forms/encrypt";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { useState } from "react";

export default function Page() {
  const [darkMode, setDarkMode] = useState(true);
  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <div className="bg-white dark:bg-black transition duration-1000">
        <div className="h-screen grid place-content-center ">
          <div className="border border-black dark:border-white rounded p-4">
            <Tabs
              colorScheme="blue"
              onChange={(index) => setDarkMode(index === 0 ? true : false)}
            >
              <TabList>
                <Tab className="w-full font-semibold">Encrypt</Tab>
                <Tab className="w-full font-semibold">Decrypt</Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <EncryptForm />
                </TabPanel>
                <TabPanel>
                  <DecryptForm />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
