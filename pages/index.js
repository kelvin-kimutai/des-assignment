import DecryptForm from "@/components/forms/decrypt";
import EncryptForm from "@/components/forms/encrypt";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";

export default function Page() {
  return (
    <div className="h-screen grid place-content-center bg-gray-100">
      <div className="shadow rounded p-8 bg-white ">
        <Tabs>
          <TabList>
            <Tab className="w-full">Encrypt</Tab>
            <Tab className="w-full">Decrypt</Tab>
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
  );
}
