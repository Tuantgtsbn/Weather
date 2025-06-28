import { Button } from '../ui/button';
const TabAddPerson = ({ textAreaValue, setTextAreaValue, setLabels }) => {
    const handleInputChange = (event) => {
        const listString = event.target.value.split('\n').filter((item) => item.trim() !== '');
        setLabels(listString);
        setTextAreaValue(event.target.value);
    };
    const handleSortLabels = () => {
        const arr = textAreaValue.split('\n').filter((item) => item.trim() !== '');
        const sortedLabels = arr.sort((a, b) => (a > b ? 1 : -1));
        setLabels(sortedLabels);
        setTextAreaValue(sortedLabels.join('\n'));
    };

    const handleSwapLabels = () => {
        const shuffled = textAreaValue.split('\n').filter((item) => item.trim() !== '');

        // Thuật toán Fisher-Yates Shuffle
        for (let i = shuffled.length - 1; i > 0; i--) {
            // Tạo chỉ số ngẫu nhiên từ 0 đến i
            const j = Math.floor(Math.random() * (i + 1));

            // Hoán đổi phần tử tại vị trí i và j
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }

        setLabels(shuffled);
        setTextAreaValue(shuffled.join('\n')); // Cập nhật nội dung của textarea
    };
    const handleDuplicateLabel = () => {
        const arr = textAreaValue.split('\n').filter((item) => item.trim() !== '');

        const duplicatedLabels = [...arr, ...arr];
        setLabels(duplicatedLabels);
        setTextAreaValue(duplicatedLabels.join('\n')); // Cập nhật nội dung của textarea
    };
    const handleDeleteAll = () => {
        setLabels([]);

        setTextAreaValue(''); // Xóa nội dung của textarea
    };
    return (
        <div className='flex flex-col gap-4 h-full'>
            <div className='flex gap-2 flex-wrap'>
                <Button onClick={handleSortLabels}>Sắp xếp</Button>
                <Button onClick={handleSwapLabels}>Hoán đổi</Button>
                <Button onClick={handleDuplicateLabel}>Nhân bản</Button>
                <Button onClick={handleDeleteAll}>Xóa hết</Button>
            </div>
            <p className='italic'>Chú ý: Tên mỗi thành viên viết trên 1 dòng</p>

            <textarea
                value={textAreaValue}
                className='p-2 border border-black w-full flex-1 overflow-y-scroll'
                name=''
                id=''
                onChange={handleInputChange}
            ></textarea>
        </div>
    );
};
export default TabAddPerson;
