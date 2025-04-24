// app/messages/page.js

import NavBar from '@/components/NavBar'
import MessagePreview from '@/components/MessagePreview'
import '../globals.css';

const mockMessages = [
  { name: 'Nicole', time: '7:55PM', message: 'Has requested to borrow an item.' },
  { name: 'Emily', time: '6:05PM', message: 'You Requested to borrow an item.' },
  { name: 'Will', time: '2:30PM', message: 'You have denied their request to borrow an item.' },
  { name: 'Justin', time: '11:11AM', message: 'Has requested to borrow an item.' },
  { name: 'Jeffrey', time: '8:23AM', message: 'You have approved their borrow request.' },
  { name: 'Bob', time: '7:55PM', message: 'Item is unavailable at that time.' },
  { name: 'Ryan', time: '6:33PM', message: 'Has requested to borrow an item.' },
  { name: 'Jasmine', time: '8:23PM', message: 'Has requested to borrow an item.' },
]

export default function Messages() {
    return (
      <div>

        <h1 className="messages-header">Messages</h1>

        <div className="messsages-previews">
          {mockMessages.map((msg, idx) => (
            <MessagePreview key={idx} {...msg} />
          ))}
        </div>   
      </div>
    );
  }