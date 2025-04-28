// app/messages/page.js

import NavBar from '@/components/NavBar'
import MessagePreview from '@/components/MessagePreview'
import '../globals.css';

const mockMessages = [
  { name: 'Nicole', time: '7:55PM', message: 'Has requested to borrow an item.', id: '1' },
  { name: 'Emily', time: '6:05PM', message: 'You Requested to borrow an item.', id: '2' },
  { name: 'Will', time: '2:30PM', message: 'You have denied their request to borrow an item.', id: '3' },
  { name: 'Justin', time: '11:11AM', message: 'Has requested to borrow an item.', id: '4' },
  { name: 'Jeffrey', time: '8:23AM', message: 'You have approved their borrow request.', id: '5' },
  { name: 'Bob', time: '7:55PM', message: 'Item is unavailable at that time.', id: '6' },
  { name: 'Ryan', time: '6:33PM', message: 'Has requested to borrow an item.', id: '7' },
  { name: 'Jasmine', time: '8:23PM', message: 'Has requested to borrow an item.', id: '8' },
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