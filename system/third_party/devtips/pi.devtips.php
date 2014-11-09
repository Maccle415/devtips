<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

/**
 * devtips Plugin
 *
 * @package		ExpressionEngine
 * @subpackage	Addons
 * @category	Plugin
 * @author		JP Erasmus
 * @link		https://github.com/jperasmus
 */

$plugin_info = array(
	'pi_name'		=> 'devtips',
	'pi_version'	=> '1.0',
	'pi_author'		=> 'JP Erasmus',
	'pi_author_url'	=> 'https://github.com/jperasmus',
	'pi_description'=> 'Basic plugin to add developer tip messages to the console',
	'pi_usage'		=> Devtips::usage()
);


class Devtips {

	public $return_data;

	/**
	 * Constructor
	 */
	public function __construct()
	{
		$include_script = FALSE;

		switch (ee()->config->item('debug'))
		{
			case 2:
				$include_script = TRUE;
				break;

			case 1:
				if (ee()->session->userdata['group_id'] == 1)
				{
					$include_script = TRUE;
				}
				break;

			default:
				break;
		}

		if ($include_script)
		{
			$this->return_data = '<script src="' . URL_THIRD_THEMES . 'devtips/js/devtips.js"></script>';
		}
	}

	// ----------------------------------------------------------------

	/**
	 * Plugin Usage
	 */
	public static function usage()
	{
		ob_start();

		echo "Simply add the tag {exp:devtips} anywhere (recommended: just above closing </body> tag) in the page template.";

		$buffer = ob_get_contents();
		ob_end_clean();
		return $buffer;
	}
}


/* End of file pi.devtips.php */
/* Location: /system/expressionengine/third_party/devtips/pi.devtips.php */