import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

const mockConsoleMethod = (realConsoleMethod) => {
    const ignoredMessages = [
        'test was not wrapped in act(...)',
        'Warning:',
        'Encountered two children',
    ]

    return (message, ...args) => {
        const containsIgnoredMessage = ignoredMessages.some((ignoredMessage) =>
            message.includes(ignoredMessage)
        )

        if (!containsIgnoredMessage) {
            realConsoleMethod(message, ...args)
        }
    }
}
// uncomment this if you want to see logs on running unit test
console.log = (jest.fn())

console.warn = jest.fn(mockConsoleMethod(console.warn))
console.error = jest.fn(mockConsoleMethod(console.error))