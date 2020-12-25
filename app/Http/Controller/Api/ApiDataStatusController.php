<?php
/**
 * FileName: ApiStatisticController.php
 * description: 统计相关API控制器
 * version: 0.1
 * date: 2016/8/29
 * author: gikidy
 */

namespace App\Http\Controllers\Api;


use App\Models\DataModels\Data\ProjectStatus;
use Request;
use App\Http\Controllers\Controller;
use App\Traits\TraitDeptDetailUtils;
use Illuminate\Database\Capsule\Manager as DB2;
use PDO;
use Seld\JsonLint\JsonParser;

class ApiDataStatusController extends Controller
{
    use TraitDeptDetailUtils;
    protected $dbConn = null;
    protected $Headers = array(
        [
            'field' => 'project_name',
            'english' => 'project_name',
            'chinese' => '工程名称',

        ],
        [
            'field' => 'configuration_name',
            'english' => 'configuration_name',
            'chinese' => '配置名称',
        ],
        [
            'field' => 'event_name',
            'english' => 'event_name',
            'chinese' => '事件名称',
        ],
        [
            'field' => 'time',
            'english' => 'time',
            'chinese' => '时间',
        ],
        [
            'field' => 'summary',
            'english' => 'summary',
            'chinese' => '摘要',
        ],

    );

    /**
     * 构造函数 初始化params 请求参数.
     */
    public function __construct()
    {
        $this->params = Request::all();
        $this->dbConn = new DB2;
        $this->dbConn->addConnection([
            'driver' => 'mysql',
            'host' => 'rm-m5ebe1fss94n7478io.mysql.rds.aliyuncs.com',
            'database' => 'cz_test',
            'username' => 'cz_test_user',
            'password' => 'CZ_test_user',
            'charset' => 'utf8',
            'collation' => 'utf8_unicode_ci',
            'prefix' => '',
            'options' => array(PDO::MYSQL_ATTR_LOCAL_INFILE => PDO::MYSQL_ATTR_LOCAL_INFILE)
        ]);
        $this->dbConn->setAsGlobal();
    }


    /**
     *
     * 查询后台程序状态
     * @author gikidy
     */
    public function getProjectStatusStat()
    {
        $count = isset($this->params['count']) ? $this->params['count'] : 8;
        $page = isset($this->params['page']) ? $this->params['page'] : 1;
        $sort = isset($this->params['sort']) ? $this->params['sort'] : "asc";

        $total = DB2::table("project_status")->count();
        $ret = DB2::table("project_status");
        if (isset($this->params['findkey']) && isset($this->params['findval'])) {
            $ret = $ret->where($this->params['findkey'], "like", "%" . $this->params['findval'] . "%");
        }
        $ret = $ret->orderBy("time", $sort)->forPage($page,$count)->get();

        $pageto = $total < ($page * $count) ? $total : ($page * $count);
        $body = [
            'current_page' => $page,
            'from' => ($page - 1) * $count + 1,
            'next_page_url' => '',
            'prev_page_url' => '',
            'per_page' => $count,
            'to' => $pageto,
            'total' => $total,
            'last_page' => (int)ceil($total / $count),
            'data' => $ret
        ];
        $data['body'] = $body;

        $data['head'] = $this->Headers;
        return $this->setJsonResponse(SUCCESS, $data);
    }

    /**
     *
     * 查询后台程序状态
     * @author gikidy
     */
    public function getSummary()
    {
        $rules = [
            'starttime' => 'required',
            'endtime' => 'required',
            'field' => 'required'
        ];
        if (isset($this->params['findkey']) && isset($this->params['findval'])) {}
        $summary[] = 'time';
        $summary[] = 'summary';
        $this->apiParamVerify($rules);
        $field = $this->params['field'];
        $starttime = $this->params['starttime'];
        $endtime = $this->params['endtime'];
        $body = [];
        $ret = DB2::table("project_status")->where("time", ">=", $starttime)->where("time", "<", $endtime)->get($summary);
        foreach ($ret as $key => $val) {
            $summary = json_decode($val->summary, true);
            if (isset($summary[$field])) {
                $body[$val->time] = $summary[$field];
            }
        }
        $data['body'] = $body;
        $data['head'] = $this->Headers;
        return $this->setJsonResponse(SUCCESS, $data);
    }

    /**
     *
     * 记录后台程序状态
     * @author gikidy
     */
    public function insertProjectStatusStat()
    {
        $rules = [
            'project_name' => 'required|in:CassandraImport',
            'configuration_name' => 'required|in:Beijing,Dongguan',
            'event_name' => 'required|in:Start,Finish,Report',
            'summary' => 'required'
        ];
        $this->apiParamVerify($rules);
        $this->params['time'] = date('Y-m-d H:i:s', time());
        $attributes = $this->params;
        $json = json_decode($attributes['summary']);
        if (is_null($json)) {
            return "摘要格式不正确";
        }
        unset($attributes['summary']);
        $ret = DB2::table("project_status")->updateOrInsert($attributes, $this->params);

        if ($ret) {
            return self:: getProjectStatusStat();
        } else {
            $ret = "录入失败";
            return $ret;
        }

    }

}



