
import { useState } from "react";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { 
  CalendarDays, 
  Plus, 
  ClipboardList, 
  CreditCard, 
  CalendarIcon, 
  Clock, 
  Users, 
  CheckSquare,
  Trash2
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { format, isSameDay } from "date-fns";

type Event = {
  id: string;
  title: string;
  description?: string;
  startDate: Date;
  endDate?: Date;
  type: 'task' | 'meeting' | 'finance' | 'other';
  participants?: string[];
};

const Calendar = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      title: 'Team Meeting',
      description: 'Weekly team sync',
      startDate: new Date(2023, 9, 15, 10, 0),
      endDate: new Date(2023, 9, 15, 11, 0),
      type: 'meeting',
      participants: ['John', 'Sarah', 'Mike'],
    },
    {
      id: '2',
      title: 'Project Deadline',
      description: 'Submit final project deliverables',
      startDate: new Date(2023, 9, 20, 17, 0),
      type: 'task',
    },
    {
      id: '3',
      title: 'Budget Review',
      description: 'Monthly budget and expense review',
      startDate: new Date(2023, 9, 5, 14, 0),
      endDate: new Date(2023, 9, 5, 15, 30),
      type: 'finance',
    },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null);

  // Filter events for the selected date
  const selectedDateEvents = events.filter((event) => 
    isSameDay(event.startDate, date)
  );

  const handleAddEvent = () => {
    const newDate = new Date(date);
    // Set time to noon by default
    newDate.setHours(12, 0, 0, 0);
    
    setCurrentEvent({
      id: '',
      title: '',
      description: '',
      startDate: newDate,
      type: 'task',
      participants: [],
    });
    setIsDialogOpen(true);
  };

  const handleEditEvent = (event: Event) => {
    setCurrentEvent(event);
    setIsDialogOpen(true);
  };

  const handleDeleteEvent = (eventId: string) => {
    setEvents(events.filter(event => event.id !== eventId));
    toast({
      title: "Event deleted",
      description: "The event has been removed from your calendar",
      variant: "destructive",
    });
  };

  const handleSaveEvent = () => {
    if (currentEvent) {
      if (currentEvent.id) {
        // Edit existing event
        setEvents(events.map(event => 
          event.id === currentEvent.id ? currentEvent : event
        ));
        toast({
          title: "Event updated",
          description: "Your calendar event has been updated",
        });
      } else {
        // Add new event
        const newEventWithId = {
          ...currentEvent,
          id: Date.now().toString(),
        };
        setEvents([...events, newEventWithId]);
        toast({
          title: "Event added",
          description: "New event has been added to your calendar",
        });
      }
      setIsDialogOpen(false);
      setCurrentEvent(null);
    }
  };

  // Get event icon based on type
  const getEventIcon = (type: string) => {
    switch (type) {
      case 'task':
        return <CheckSquare className="h-4 w-4 text-blue-500" />;
      case 'meeting':
        return <Users className="h-4 w-4 text-purple-500" />;
      case 'finance':
        return <CreditCard className="h-4 w-4 text-green-500" />;
      default:
        return <CalendarIcon className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-1">Calendar</h1>
          <p className="text-muted-foreground">Schedule and manage your events and tasks</p>
        </div>
        <Button onClick={handleAddEvent} className="flex items-center">
          <Plus className="mr-2 h-4 w-4" /> Add Event
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Calendar */}
        <Card className="md:col-span-7">
          <CardHeader className="pb-4">
            <CardTitle>Calendar</CardTitle>
            <CardDescription>Select a date to view or add events</CardDescription>
          </CardHeader>
          <CardContent>
            <CalendarComponent
              mode="single"
              selected={date}
              onSelect={(date) => date && setDate(date)}
              className="rounded-md border p-4 pointer-events-auto"
              // Add dots to dates with events
              modifiers={{
                event: events.map(event => new Date(event.startDate))
              }}
              modifiersStyles={{
                event: {
                  fontWeight: 'bold',
                  textDecoration: 'underline',
                  color: 'var(--accent)'
                }
              }}
            />
          </CardContent>
        </Card>

        {/* Events for selected date */}
        <Card className="md:col-span-5">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center">
              <CalendarDays className="mr-2 h-5 w-5" />
              Events for {format(date, 'MMMM d, yyyy')}
            </CardTitle>
            <CardDescription>
              {selectedDateEvents.length === 0 
                ? 'No events scheduled for this date' 
                : `${selectedDateEvents.length} event${selectedDateEvents.length > 1 ? 's' : ''} scheduled`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedDateEvents.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-48 text-center">
                <ClipboardList className="h-10 w-10 text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-4">No events scheduled for this date</p>
                <Button onClick={handleAddEvent} variant="outline">
                  <Plus className="mr-2 h-4 w-4" /> Add Event
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {selectedDateEvents.map((event) => (
                  <div 
                    key={event.id} 
                    className={`p-4 rounded-lg border ${
                      event.type === 'task' ? 'border-blue-500/20' : 
                      event.type === 'meeting' ? 'border-purple-500/20' : 
                      event.type === 'finance' ? 'border-green-500/20' : 
                      'border-border'
                    } hover:bg-card/50 transition-colors cursor-pointer`}
                    onClick={() => handleEditEvent(event)}
                  >
                    <div className="flex justify-between">
                      <div className="flex items-center mb-2">
                        {getEventIcon(event.type)}
                        <span className="font-medium ml-2">{event.title}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive opacity-0 group-hover:opacity-100"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteEvent(event.id);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    {event.description && (
                      <p className="text-sm text-muted-foreground mb-2">{event.description}</p>
                    )}
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>
                        {format(event.startDate, 'h:mm a')}
                        {event.endDate && ` - ${format(event.endDate, 'h:mm a')}`}
                      </span>
                    </div>
                    {event.participants && event.participants.length > 0 && (
                      <div className="flex items-center text-xs text-muted-foreground mt-1">
                        <Users className="h-3 w-3 mr-1" />
                        <span>{event.participants.join(', ')}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Event Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>{currentEvent?.id ? 'Edit Event' : 'Add New Event'}</DialogTitle>
            <DialogDescription>
              {currentEvent?.id 
                ? 'Update the event details below.' 
                : 'Fill in the information below to add a new event.'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Event Title</Label>
              <Input
                id="title"
                value={currentEvent?.title || ''}
                onChange={(e) => setCurrentEvent(prev => prev ? { ...prev, title: e.target.value } : null)}
                placeholder="Enter event title"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Input
                id="description"
                value={currentEvent?.description || ''}
                onChange={(e) => setCurrentEvent(prev => prev ? { ...prev, description: e.target.value } : null)}
                placeholder="Enter event description"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={currentEvent?.startDate.toISOString().split('T')[0] || ''}
                  onChange={(e) => {
                    if (currentEvent) {
                      const newDate = new Date(e.target.value);
                      newDate.setHours(
                        currentEvent.startDate.getHours(),
                        currentEvent.startDate.getMinutes()
                      );
                      setCurrentEvent({ ...currentEvent, startDate: newDate });
                    }
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Event Type</Label>
                <Select
                  value={currentEvent?.type}
                  onValueChange={(value: 'task' | 'meeting' | 'finance' | 'other') => 
                    setCurrentEvent(prev => prev ? { ...prev, type: value } : null)
                  }
                >
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="task">Task</SelectItem>
                    <SelectItem value="meeting">Meeting</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startTime">Start Time</Label>
                <Input
                  id="startTime"
                  type="time"
                  value={currentEvent
                    ? `${String(currentEvent.startDate.getHours()).padStart(2, '0')}:${String(currentEvent.startDate.getMinutes()).padStart(2, '0')}`
                    : ''
                  }
                  onChange={(e) => {
                    if (currentEvent && e.target.value) {
                      const [hours, minutes] = e.target.value.split(':').map(Number);
                      const newDate = new Date(currentEvent.startDate);
                      newDate.setHours(hours, minutes);
                      setCurrentEvent({ ...currentEvent, startDate: newDate });
                    }
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endTime">End Time (Optional)</Label>
                <Input
                  id="endTime"
                  type="time"
                  value={currentEvent?.endDate
                    ? `${String(currentEvent.endDate.getHours()).padStart(2, '0')}:${String(currentEvent.endDate.getMinutes()).padStart(2, '0')}`
                    : ''
                  }
                  onChange={(e) => {
                    if (currentEvent && e.target.value) {
                      const [hours, minutes] = e.target.value.split(':').map(Number);
                      const endDate = new Date(currentEvent.startDate);
                      endDate.setHours(hours, minutes);
                      setCurrentEvent({ ...currentEvent, endDate });
                    } else if (currentEvent) {
                      setCurrentEvent({ ...currentEvent, endDate: undefined });
                    }
                  }}
                />
              </div>
            </div>
            {currentEvent?.type === 'meeting' && (
              <div className="space-y-2">
                <Label htmlFor="participants">Participants (comma separated)</Label>
                <Input
                  id="participants"
                  value={currentEvent?.participants?.join(', ') || ''}
                  onChange={(e) => {
                    const participantsArray = e.target.value
                      ? e.target.value.split(',').map(p => p.trim()).filter(Boolean)
                      : [];
                    setCurrentEvent(prev => prev ? { ...prev, participants: participantsArray } : null);
                  }}
                  placeholder="John, Sarah, Mike"
                />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleSaveEvent} 
              disabled={!currentEvent?.title || !currentEvent?.startDate}
            >
              {currentEvent?.id ? 'Update Event' : 'Add Event'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Calendar;
