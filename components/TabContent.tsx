import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import React from "react";
import DisplayNote from "./DisplayNote";
import DisplayReplies from "./DisplayReplies";

const TabContent = ({ _id }) => {
  return (
    <div>
      <Tabs defaultValue="notes" className="w-full">
        <TabsList className="w-full bg-[#5b694c]">
          <TabsTrigger
            value="notes"
            className="w-full text-white data-[state='active']:bg-[#6d8552] data-[state='active']:!text-white"
          >
            Notes
          </TabsTrigger>
          <TabsTrigger
            value="replies"
            className="w-full text-white data-[state='active']:bg-[#6d8552] data-[state='active']:!text-white"
          >
            Replies
          </TabsTrigger>
        </TabsList>
        <TabsContent value="notes">
          <div className="min-h-48">
            <DisplayNote _id={_id} />
          </div>
        </TabsContent>
        <TabsContent value="replies">
          <div className="min-h-48">
            <DisplayReplies _id={_id} />
          </div>
        </TabsContent>
      </Tabs>
      ;
    </div>
  );
};

export default TabContent;
