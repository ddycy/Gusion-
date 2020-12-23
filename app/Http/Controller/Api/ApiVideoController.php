<?php
/**
 * FileName: ApiVedioController.php
 * description: 车辆视频API控制器
 * version: 0.1
 * date: 2016/5/25
 * author: fanyin 
 */
namespace App\Http\Controllers\Api;

use Auth;
use Response;
use Validator;
use Request;

use App\Http\Controllers\Controller;
use App\Models\BussinessModels\Video\Video;
use App\Exceptions\ParamException;

class ApiVideoController extends Controller{

    /**
     * 构造函数 初始化params 请求参数.
     */
    public function __construct()
    {
        $this->params = Request::all();
    }

//******************************************************视频控制API***********************************************
    /**
     *
     * @author fanyin 
     */
    public function start (Request $request){

        $rules = [
            'car_id' => 'required',
        ];

        print("test");
        print("test");
        print("test");
        print("test");
        print("test");

        $this->apiParamVerify($rules);

        $ret =(new Video())->play_video($this->params);

        return $this->setJsonResponse(SUCCESS,$ret);


    }

    public function heartbeat (Request $request)
    {

        $rules = [
            'car_id' => 'required',
        ];

        $this->apiParamVerify($rules);

        $ret = (new Video())->heartbeat_video($this->params);

        return $this->setJsonResponse(SUCCESS, $ret);
    }

}
