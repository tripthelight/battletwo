import { errorManagement } from '@/client/js/module/errorHandler/errorManagement';

/**
 * 브라우저 이벤트 콜백 안에서 발생한 오류를 공용 오류 처리기로 전달한다.
 *
 * 오류가 확정되면 connectSignaling의 공용 종료 루틴이 실시간 연결을
 * 정리하므로 sessionStorage key를 무작위로 바꾸는 추가 작업은 하지 않는다.
 */
export default (error) => {
  errorManagement(error);
};
