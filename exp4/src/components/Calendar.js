import React, { memo, useMemo } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

function Calendar({
  posts,
  onSelectPost,
  onUpdatePostDate
}) {
  const events = useMemo(() => {
    return posts.map((post) => ({
      id: post.id,
      title: `${post.platform}: ${post.title}`,
      start: post.start
    }));
  }, [posts]);

  const handleEventClick = (info) => {
    const post = posts.find(
      (item) => item.id === info.event.id
    );

    onSelectPost(post);
  };

  const handleEventDrop = (info) => {
    onUpdatePostDate(
      info.event.id,
      info.event.start.toISOString()
    );
  };

  return (
    <div className="calendar">
      <FullCalendar
        plugins={[
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin
        ]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay"
        }}
        events={events}
        editable={true}
        selectable={true}
        eventClick={handleEventClick}
        eventDrop={handleEventDrop}
      />
    </div>
  );
}

export default memo(Calendar);